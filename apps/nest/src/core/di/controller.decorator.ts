import { applyDecorators } from '@auth/core';
import { Controller as NestController } from '@nestjs/common';

export function Controller(prefix?: string | string[]) {
  return applyDecorators(
    // @ts-expect-error lala
    NestController(prefix),
  );
}
