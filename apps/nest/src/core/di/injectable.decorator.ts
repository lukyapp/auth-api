import { applyDecorators } from '@auth/core';
import {
  Injectable as NestInjectable,
  InjectableOptions,
} from '@nestjs/common';

export function Injectable(options?: InjectableOptions) {
  return applyDecorators(NestInjectable(options));
}
