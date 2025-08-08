import { applyDecorators } from '@auth/core';
import { IsNumber, Max, Min } from '@auth/validation';

export function IsPort() {
  return applyDecorators(IsNumber(), Min(0), Max(65535));
}
