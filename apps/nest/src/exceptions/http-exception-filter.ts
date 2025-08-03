import { HttpException } from '@auth/domain';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus: number = exception.response.statusCode;
    const responseBody = this.buildResponseBody(exception);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private buildResponseBody(exception: HttpException) {
    const { statusCode, errorCode, message, contraints } = exception.response;
    if (statusCode != 400) {
      this.logger.error(contraints);
      return {
        statusCode,
        errorCode,
        message,
      };
    }
    return {
      statusCode,
      errorCode,
      message,
      contraints,
    };
  }
}
