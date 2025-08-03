import { applyDecorators } from '@auth/core';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

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
