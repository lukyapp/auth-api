import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@auth/validation';
import { ConfigurationServicePort } from '../config/configuration.service.port';
import { injectable } from '@auth/di';
import { EnvironmentVariablesDto } from '../config/environment-variables.dto';

@injectable()
@ValidatorConstraint({ name: 'isInEnvArray', async: false })
export class IsInEnvArrayConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  validate(value: string, args: ValidationArguments) {
    const [arrayPath] = args.constraints as [keyof EnvironmentVariablesDto];
    const array = this.configurationService.get(arrayPath);
    if (Array.isArray(array)) {
      // @ts-expect-error lala
      return array.includes(value);
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [arrayPath] = args.constraints as [keyof EnvironmentVariablesDto];
    const array = this.configurationService.get(arrayPath);
    return `'${args.value}' is not in the authorized items : ${array}`;
  }
}

export function IsInEnvArray<
  TArrayProperty extends keyof EnvironmentVariablesDto,
>(arrayProperty: TArrayProperty, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isInEnvArray',
      target: object.constructor,
      propertyName,
      constraints: [arrayProperty],
      options: validationOptions,
      validator: IsInEnvArrayConstraint,
    });
  };
}
