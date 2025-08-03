import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  isObject,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';
import { Nested } from '../validators/nested.validator';
import { HttpError } from './beans/http-errors';
import { IntrinsicException } from './beans/intrinsic.exception';

export class HttpExceptionConstraint {
  @Expose()
  @IsString()
  declare public readonly property: string;
  @Expose()
  @IsString()
  declare public readonly value: string;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  declare public readonly constraints: string[];
}

export class HttpExceptionResponse<THttpError extends HttpError> extends Dto<
  HttpExceptionResponse<THttpError>
> {
  @Expose()
  @IsNumber()
  declare public readonly statusCode: THttpError['statusCode'];
  @Expose()
  @IsString()
  declare public readonly errorCode: THttpError['errorCode'];
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly message?: string;

  constructor({
    httpError,
    message,
  }: {
    httpError: THttpError;
    message?: string;
  }) {
    super({
      errorCode: httpError.errorCode,
      statusCode: httpError.statusCode,
      message,
    });
  }
}

export class HttpExceptionWithContraintsResponse<
  THttpError extends HttpError,
> extends HttpExceptionResponse<THttpError> {
  @Expose()
  @IsOptional()
  @IsArray()
  @Nested(() => HttpExceptionConstraint, { each: true })
  declare public readonly contraints?: HttpExceptionConstraint[];

  constructor({
    httpError,
    message,
    contraints,
  }: {
    httpError: THttpError;
    message?: string;
    contraints?: HttpExceptionConstraint[];
  }) {
    super({
      httpError,
      message,
    });
    this.contraints = contraints;
  }
}

export class HttpException<
  THttpError extends HttpError = HttpError,
  TResponse extends
    HttpExceptionWithContraintsResponse<THttpError> = HttpExceptionWithContraintsResponse<THttpError>,
> extends IntrinsicException {
  constructor(public readonly response: TResponse) {
    super();
    this.initMessage();
    this.initName();
  }

  public initName() {
    this.name = this.constructor.name;
  }

  public initMessage() {
    if (isObject(this.response) && isString(this.response.message)) {
      this.message = this.response.message;
    } else if (this.constructor) {
      this.message =
        this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ??
        'Error';
    }
  }
}
