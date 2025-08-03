import { applyDecorators, Type } from '@auth/core';
import { HttpError, HttpExceptionResponse } from '@auth/domain';
import { ApiResponse } from '@nestjs/swagger';

export function ApiExceptionResponse<
  THttpError extends HttpError,
  THttpExceptionResponse extends Type<HttpExceptionResponse<THttpError>>,
>(HttpExceptionResponse: THttpExceptionResponse & { statusCode: number }) {
  {
    return applyDecorators(
      ApiResponse({
        status: HttpExceptionResponse.statusCode,
        type: HttpExceptionResponse,
      }),
    );
  }
}
