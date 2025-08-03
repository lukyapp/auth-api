import { applyDecorators } from '@auth/core';
import { IsNumber, Max, Min } from 'class-validator';

export function IsPort() {
  return applyDecorators(IsNumber(), Min(0), Max(65535));
}
