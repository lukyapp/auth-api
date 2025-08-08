import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@auth/validation';
import { ConfigurationServicePort } from '../config/configuration.service.port';
import { injectable } from '@auth/di';

@injectable()
@ValidatorConstraint({ name: 'isGoodIssuer', async: false })
export class IsGoodIssuerConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  validate(value: string, _args: ValidationArguments) {
    const authorizedIssuers = this.configurationService.get(
      'jwt.verify.authorizedIssuers',
    );
    return authorizedIssuers.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    const authorizedIssuers = this.configurationService.get(
      'jwt.verify.authorizedIssuers',
    );
    return `'${args.value}' is not in the authorized issuers : ${authorizedIssuers}`;
  }
}

export function IsGoodIssuer(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isGoodIssuer',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsGoodIssuerConstraint,
    });
  };
}
