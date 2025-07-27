import { applyDecorators } from '@nestjs/common';
import { IsUrl as _IsUrl, ValidationOptions } from 'class-validator';

export function IsUrl(validationOptions?: ValidationOptions) {
  return applyDecorators(
    _IsUrl(
      { protocols: ['http', 'https'], require_tld: false },
      validationOptions,
    ),
  );
}
