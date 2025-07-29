import { applyDecorators, Injectable } from '@nestjs/common';

export function injectable() {
  return applyDecorators(Injectable);
}
