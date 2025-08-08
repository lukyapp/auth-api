import { Type } from '@auth/core';
import {
  BadRequestException,
  HttpError,
  InternalServerErrorException,
  MetadateService,
} from '@auth/domain';
import {
  plainToInstance,
  validateAsync,
  validateSync,
  ValidationError,
} from '@auth/validation';

type ClassSerializerInterceptorOptions = ClassTransformOptions & {
  transformerPackage?: TransformerPackage;
};

type TransformerPackage = {
  plainToInstance<T>(
    cls: Type<T>,
    plain: unknown,
    options?: ClassTransformOptions,
  ): T | T[];
  classToPlain(
    object: unknown,
    options?: ClassTransformOptions,
  ): Record<string, any> | Record<string, any>[];
};

type ValidatorPackage = {
  validate(
    object: unknown,
    validatorOptions?: ValidatorOptions,
  ): ValidationError[] | Promise<ValidationError[]>;
};

type ValidatorOptions = {
  enableDebugMessages?: boolean;
  skipUndefinedProperties?: boolean;
  skipNullProperties?: boolean;
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
  groups?: string[];
  always?: boolean;
  strictGroups?: boolean;
  dismissDefaultMessages?: boolean;
  validationError?: {
    target?: boolean;
    value?: boolean;
  };
  forbidUnknownValues?: boolean;
  stopAtFirstError?: boolean;
};

type ClassTransformOptions = {
  strategy?: 'excludeAll' | 'exposeAll';
  groups?: string[];
  version?: number;
  excludePrefixes?: string[];
  ignoreDecorators?: boolean;
  targetMaps?: any[];
  enableCircularCheck?: boolean;
  enableImplicitConversion?: boolean;
  excludeExtraneousValues?: boolean;
  exposeDefaultValues?: boolean;
  exposeUnsetFields?: boolean;
};

type ValidationPipeOptions = ValidatorOptions & {
  transform?: boolean;
  disableErrorMessages?: boolean;
  transformOptions?: ClassTransformOptions;
  errorHttpStatusCode?: HttpError['statusCode'];
  exceptionFactory?: (errors: ValidationError[]) => any;
  validateCustomDecorators?: boolean;
  expectedType?: Type<any>;
  validatorPackage?: ValidatorPackage;
  transformerPackage?: TransformerPackage;
};

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

  static async validate<T extends object, V>(cls: Type<T>, plain: V) {
    const instance = plainToInstance(
      cls,
      plain,
      this.getClassSerializerInterceptorOptions(),
    );
    const errors = await validateAsync(
      instance,
      this.getValidationPipeOptions(),
    );
    if (errors.length > 0) {
      const contraints = this.flattenValidationErrors(errors);
      const Error = MetadateService.getMetadataError(instance);
      if (Error) {
        throw new Error('Error in body', contraints);
      }
      console.log('contraints : ', contraints);
      throw new InternalServerErrorException('Unknown error', contraints);
    }
    return instance;
  }

  static validateSync<T extends object, V>(cls: Type<T>, plain: V) {
    const instance = plainToInstance(
      cls,
      plain,
      this.getClassSerializerInterceptorOptions(),
    );
    const errors = validateSync(instance, this.getValidationPipeOptions());
    if (errors.length > 0) {
      const contraints = this.flattenValidationErrors(errors);
      const Error = MetadateService.getMetadataError(instance);
      if (Error) {
        throw new Error('Error in body', contraints);
      }
      console.log('contraints : ', contraints);
      throw new InternalServerErrorException('Unknown error', contraints);
    }
    return instance;
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
