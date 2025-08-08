import { applyDecorators } from '@auth/core';
import { Type } from '@auth/validation';
import { ValidateNested, ValidationOptions } from '@auth/validation';

type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export type DiscriminatorDescriptor = {
  property: string;
  subTypes: {
    name: string;
    value: ClassConstructor<any>;
  }[];
};

type TypeHelpOptions = {
  newObject: any;
  object: Record<string, any>;
  property: string;
};

export type TypeOptions = {
  discriminator?: DiscriminatorDescriptor;
  keepDiscriminatorProperty?: boolean;
};

export function Nested(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  typeFunction: (type?: TypeHelpOptions) => Function,
  validationOptions?: ValidationOptions,
  options?: TypeOptions,
) {
  return applyDecorators(
    Type(typeFunction, options),
    ValidateNested(validationOptions),
  );
}
