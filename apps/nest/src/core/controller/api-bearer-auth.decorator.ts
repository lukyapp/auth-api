import { Dto } from '@auth/core';
import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth as SwaggerApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

export class ApiUnauthorizedResponseErrorBody extends Dto<ApiUnauthorizedResponseErrorBody> {
  public readonly message: string = 'Unauthorized';
  public readonly error?: string = 'Unauthorized';
  public readonly statusCode: number = HttpStatus.UNAUTHORIZED;
}

export function ApiBearerAuth() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      type: ApiUnauthorizedResponseErrorBody,
    }),
    SwaggerApiBearerAuth('userAccessToken'),
    UseGuards(JwtAuthGuard),
  );
}
