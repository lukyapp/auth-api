import { injectable } from '@auth/di';
import { HttpException, InternalServerErrorException } from '@auth/domain';
import { Logger } from '@nestjs/common';

@injectable()
export class ExceptionsHandler {
  private readonly logger = new Logger(this.constructor.name);

  constructor() {}

  handle(exception: unknown) {
    if (exception instanceof HttpException) {
      return exception;
    }
    this.logger.error(exception);
    return new InternalServerErrorException('Unknown error');
  }
}
