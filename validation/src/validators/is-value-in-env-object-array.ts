import { Type } from '@auth/core';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValueInObjectArray', async: false })
export class IsValueInObjectArrayConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const [arrayPath, key] = args.constraints as [string, string];
    const object = args.object as any;
    const keys = object[arrayPath];

    if (!Array.isArray(keys)) {
      return false;
    }
    return keys.some((k) => k[key] === value);
  }

  defaultMessage(args: ValidationArguments) {
    const [arrayPath, key] = args.constraints as [string, string];
    return `'${args.value}' is not a valid value in ${arrayPath}[].${key}`;
  }
}

export function IsValueInObjectArray<
  TDto extends object,
  TArrayProperty extends keyof TDto,
  TKey extends TDto[TArrayProperty] extends Array<infer U> ? keyof U : never,
>(
  _dto: Type<TDto>,
  arrayProperty: TArrayProperty,
  key: TKey,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValueInObjectArray',
      target: object.constructor,
      propertyName,
      constraints: [arrayProperty, key],
      options: validationOptions,
      validator: IsValueInObjectArrayConstraint,
    });
  };
}
