/* eslint-disable */

import { applyDecorators } from '@auth/core';
import { Type, TypeHelpOptions, TypeOptions } from 'class-transformer';
import { ValidateNested, ValidationOptions } from 'class-validator';

export function Nested(
  typeFunction: (type?: TypeHelpOptions) => Function,
  validationOptions?: ValidationOptions,
  options?: TypeOptions,
) {
  return applyDecorators(
    Type(typeFunction, options),
    ValidateNested(validationOptions),
  );
}
