import { HttpErrors } from './beans/http-errors';
import {
  HttpException,
  HttpExceptionConstraint,
  HttpExceptionWithContraintsResponse,
} from './http.exception';

const httpError = HttpErrors.BAD_REQUEST;

export class BadRequestExceptionResponse extends HttpExceptionWithContraintsResponse<
  typeof httpError
> {
  public static readonly statusCode = httpError.statusCode;
  public readonly statusCode = httpError.statusCode;
  public readonly errorCode = httpError.errorCode;
}

export class BadRequestException extends HttpException<typeof httpError> {
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
    const { statusCode, errorCode, message, contraints } = this.response;
    return {
      statusCode,
      errorCode,
      message,
      contraints,
    };
  }
}
