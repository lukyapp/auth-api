import { applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { TypeHelpOptions } from 'class-transformer/types/interfaces';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from '../transformers/type.transformer';

export function IsEnvJsonArray(
  typeFunction: (type?: TypeHelpOptions) => ClassConstructor<any>,
) {
  return applyDecorators(
    IsArray(),
    ValidateNested({ each: true }),
    Type(typeFunction),
  );
}
