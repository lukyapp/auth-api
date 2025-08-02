import { injectable } from '@auth/di';
import { BadRequestException, Logger } from '@nestjs/common';
import { FindOneUserUseCase } from '../../../primary-services/user/use-cases/find-one-user.use-case';
import { AuthStrategy } from './auth.strategy.interface';

type Body = {
  email: string;
};

@injectable()
export class NoPasswordCheckAuthStrategy extends AuthStrategy<Body> {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly findOneUserUseCase: FindOneUserUseCase) {
    super();
  }

  async authenticate({ email }: Body) {
    const { data: found } = await this.findOneUserUseCase.perform({ email });
    if (!found) {
      this.logger.log('! found');
      throw new BadRequestException('WRONG_CREDENTIALS');
    }
    return found;
  }
}
