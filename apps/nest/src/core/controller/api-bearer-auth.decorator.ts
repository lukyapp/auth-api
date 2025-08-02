import { Dto } from '@auth/core';
import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';
import {
  ApiBearerAuth as SwaggerApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export class ApiUnauthorizedResponseErrorBody extends Dto<ApiUnauthorizedResponseErrorBody> {
  public readonly message: string = 'Unauthorized';
  public readonly error?: string = 'Unauthorized';
  public readonly statusCode: number = HttpStatus.UNAUTHORIZED;
}

export function ApiBearerAuth(guard?: CanActivate | Function) {
  const guards: (CanActivate | Function)[] = [];
  if (guard) {
    guards.push(guard);
  }
  return applyDecorators(
    ApiUnauthorizedResponse({
      type: ApiUnauthorizedResponseErrorBody,
    }),
    SwaggerApiBearerAuth('userAccessToken'),
    UseGuards(...guards),
  );
}
