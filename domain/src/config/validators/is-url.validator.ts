import { applyDecorators } from '@auth/core';
import { IsUrl as _IsUrl, ValidationOptions } from '@auth/validation';

export function IsUrl(validationOptions?: ValidationOptions) {
  return applyDecorators(
    _IsUrl(
      { protocols: ['http', 'https'], require_tld: false },
      validationOptions,
    ),
  );
}
