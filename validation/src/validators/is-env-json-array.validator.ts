import { applyDecorators } from '@auth/core';
import { ClassConstructor, TypeHelpOptions } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { TypeFromString } from '../transformers/type-from-string.transformer';

export function IsEnvJsonArray(
  typeFunction: (type?: TypeHelpOptions) => ClassConstructor<any>,
) {
  return applyDecorators(
    IsArray(),
    ValidateNested({ each: true }),
    TypeFromString(typeFunction),
  );
}
