import { ExceptionsHandler } from '@auth/application';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly exceptionsHandler: ExceptionsHandler,
  ) {}

  catch(unknownException: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const exception = this.exceptionsHandler.handle(unknownException);
    httpAdapter.reply(
      ctx.getResponse(),
      exception.getResponseBody(),
      exception.getStatus(),
    );
  }
}
