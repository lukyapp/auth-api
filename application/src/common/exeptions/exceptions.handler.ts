import { injectable } from '@auth/di';
import { HttpException, InternalServerErrorException } from '@auth/domain';
import { GenericService } from '../logger/generic.service';

@injectable()
export class ExceptionsHandler extends GenericService {
  handle(exception: unknown) {
    if (exception instanceof HttpException) {
      return exception;
    }
    this.logger.error(exception);
    return new InternalServerErrorException('Unknown error');
  }
}
