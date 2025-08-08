import { HttpErrors } from './beans/http-errors';
import {
  HttpException,
  HttpExceptionConstraint,
  HttpExceptionResponse,
  HttpExceptionWithContraintsResponse,
} from './http.exception';

const httpError = HttpErrors.INTERNAL_SERVER_ERROR;

export class InternalServerExceptionResponse extends HttpExceptionResponse<
  typeof httpError
> {
  public static readonly statusCode = httpError.statusCode;
  public readonly statusCode = httpError.statusCode;
  public readonly errorCode = httpError.errorCode;
}

export class InternalServerErrorException extends HttpException<
  typeof httpError
> {
  constructor(message?: string, contraints?: HttpExceptionConstraint[]) {
    super(
      new HttpExceptionWithContraintsResponse({
        httpError,
        message,
        contraints,
      }),
    );
  }

  public getResponseBody() {
    const { statusCode, errorCode } = this.response;
    return {
      statusCode,
      errorCode,
    };
  }
}
