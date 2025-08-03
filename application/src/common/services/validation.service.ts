import { Type } from '@auth/core';
import { BadRequestException } from '@auth/domain';
import { ValidationPipeOptions } from '@nestjs/common';
import { ClassSerializerInterceptorOptions } from '@nestjs/common/serializer/class-serializer.interceptor';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

export class ValidationService {
  constructor() {}

  static getClassSerializerInterceptorOptions(): ClassSerializerInterceptorOptions {
    return {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    };
  }

  static getValidationPipeOptions(): ValidationPipeOptions {
    // TODO isProductionMode
    const isProductionMode = false;
    return {
      whitelist: true, // supprime automatiquement toutes les propriétés qui n'ont pas de décorateurs définis dans le DTO
      disableErrorMessages: isProductionMode, // Désactiver les messages d'erreur détaillés
      transform: true, // transforme automatiquement les objets simples en instances de leur classe
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const contraints = this.flattenValidationErrors(errors);
        return new BadRequestException('Error in body', contraints);
      },
    };
  }

  static validate<T extends object, V>(cls: Type<T>, plain: V) {
    const params = plainToInstance(
      cls,
      plain,
      this.getClassSerializerInterceptorOptions(),
    );
    const errors = validateSync(params, this.getValidationPipeOptions());
    if (errors.length > 0) {
      console.error(
        errors.map(({ property, value, constraints }) => {
          return {
            property,
            value,
            constraints,
          };
        }),
      );
      throw new BadRequestException();
    }
    return params;
  }

  static validateOneField<T extends object>(
    cls: Type<T>,
    value: any,
    name: string,
  ) {
    const params = plainToInstance(
      cls,
      { [name]: value },
      this.getClassSerializerInterceptorOptions(),
    );
    const errors = validateSync(params, this.getValidationPipeOptions());
    const fieldErrors = errors.find((err) => err.property === name);
    if (fieldErrors) {
      const contraints = this.flattenValidationErrors([fieldErrors]);
      console.error('contraints : ', contraints);
      throw new BadRequestException('Error in body', contraints);
    }
    // @ts-expect-error lala
    return params[name];
  }

  static flattenValidationErrors(validationErrors: ValidationError[]) {
    const result: {
      property: string;
      value: string;
      constraints: string[];
    }[] = [];

    function processNode(node: ValidationError, parentNode?: ValidationError) {
      const entry = {
        property: parentNode
          ? [parentNode.property, node.property].join('.')
          : node.property,
        value: node.value,
        constraints: node.constraints ? Object.values(node.constraints) : [],
      };
      if (entry.constraints.length) {
        result.push(entry);
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => processNode(child, node));
      }
    }

    validationErrors.forEach((validationError) => processNode(validationError));
    return result;
  }
}
