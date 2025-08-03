import { applyDecorators } from '@auth/core';
import { BadRequestExceptionResponse } from '@auth/domain';
import {
  Delete as NestDelete,
  Get as NestGet,
  Patch as NestPatch,
  Post as NestPost,
  Put as NestPut,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiExceptionResponse } from './api-exception-response.decorator';

function ApiOperationId(): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const operationId = propertyKey.toString();
    ApiOperation({ operationId })(target, propertyKey, descriptor);
  };
}

function ApiExceptionResponses() {
  return applyDecorators(ApiExceptionResponse(BadRequestExceptionResponse));
}

export function Get(path?: string) {
  return applyDecorators(
    NestGet(path),
    ApiOperationId(),
    ApiExceptionResponses(),
  );
}

export function Post(path?: string) {
  return applyDecorators(
    NestPost(path),
    ApiOperationId(),
    ApiExceptionResponses(),
  );
}

export function Patch(path?: string) {
  return applyDecorators(
    NestPatch(path),
    ApiOperationId(),
    ApiExceptionResponses(),
  );
}

export function Put(path?: string) {
  return applyDecorators(
    NestPut(path),
    ApiOperationId(),
    ApiExceptionResponses(),
  );
}

export function Delete(path?: string) {
  return applyDecorators(
    NestDelete(path),
    ApiOperationId(),
    ApiExceptionResponses(),
  );
}
