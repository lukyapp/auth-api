import { HttpErrors } from './beans/http-errors';
import {
  HttpException,
  HttpExceptionConstraint,
  HttpExceptionResponse,
  HttpExceptionWithContraintsResponse,
} from './http.exception';

const httpError = HttpErrors.NOT_IMPLEMENTED;

export class NotImplementedExceptionResponse extends HttpExceptionResponse<
  typeof httpError
> {
  public static readonly statusCode = httpError.statusCode;
  public readonly statusCode = httpError.statusCode;
  public readonly errorCode = httpError.errorCode;
}

export class NotImplementedException extends HttpException<typeof httpError> {
  constructor(message?: string, contraints?: HttpExceptionConstraint[]) {
    super(
      new HttpExceptionWithContraintsResponse({
        httpError,
        message,
        contraints,
      }),
    );
  }
}
