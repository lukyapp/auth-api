import { applyDecorators } from '@auth/core';
import { ClassConstructor } from '@auth/validation';
import { IsArray, ValidateNested } from '@auth/validation';
import { Type } from '../transformers/type.transformer';

type TypeHelpOptions = {
  newObject: any;
  object: Record<string, any>;
  property: string;
};

export function IsEnvJsonArray(
  typeFunction: (type?: TypeHelpOptions) => ClassConstructor<any>,
) {
  return applyDecorators(
    IsArray(),
    ValidateNested({ each: true }),
    Type(typeFunction),
  );
}
