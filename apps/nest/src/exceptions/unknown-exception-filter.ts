import { InternalServerErrorException } from '@auth/domain';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    this.logger.log(exception);
    const internalServerErrorException = new InternalServerErrorException(
      'Unknown error',
    );
    httpAdapter.reply(
      ctx.getResponse(),
      internalServerErrorException.getResponseBody(),
      internalServerErrorException.getStatus(),
    );
  }
}
