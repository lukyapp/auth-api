import { applyDecorators, Type } from '@auth/core';
import { UnauthorizedExceptionResponse } from '@auth/domain';
import { UseGuards } from '@nestjs/common';
import { IAuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ApiBearerAuth as SwaggerApiBearerAuth } from '@nestjs/swagger';
import { ApiExceptionResponse } from './api-exception-response.decorator';

function ApiExceptionResponses() {
  return applyDecorators(ApiExceptionResponse(UnauthorizedExceptionResponse));
}

export function ApiBearerAuth(guard?: Type<IAuthGuard>) {
  const guards: Type<IAuthGuard>[] = [];
  if (guard) {
    guards.push(guard);
  }
  return applyDecorators(
    SwaggerApiBearerAuth('userAccessToken'),
    ApiExceptionResponses(),
    UseGuards(...guards),
  );
}
