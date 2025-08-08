import { applyDecorators } from '@auth/core';
import { Transform } from '@auth/validation';
import { ArrayNotEmpty, IsArray, IsString } from '@auth/validation';

export function IsEnvArray() {
  return applyDecorators(
    IsArray(),
    ArrayNotEmpty(),
    IsString({ each: true }),
    Transform(({ value }) =>
      typeof value === 'string'
        ? value
            .split(',')
            .filter((value) => value !== '')
            .map((v) => v.trim())
        : value,
    ),
  );
}
