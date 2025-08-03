import { HttpError } from './beans/http-errors';
import { HttpExceptionConstraint } from './http.exception';

export abstract class HttpExceptionInterface {
  abstract getStatus(): HttpError['statusCode'];

  abstract getResponseBody(): {
    statusCode: HttpError['statusCode'];
    errorCode: HttpError['errorCode'];
    message?: string;
    contraints?: HttpExceptionConstraint[];
  };
}
