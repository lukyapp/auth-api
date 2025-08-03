import { applyDecorators } from '@auth/core';
import {
  isString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStringOrStringArray', async: false })
class IsStringOrStringArrayConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (isString(value)) return true;
    if (Array.isArray(value)) return value.every(isString);
    return false;
  }

  defaultMessage({ property }: ValidationArguments) {
    return `${property} must be a string or an array of strings`;
  }
}

export function IsStringOrStringArray() {
  return applyDecorators(Validate(IsStringOrStringArrayConstraint));
}
