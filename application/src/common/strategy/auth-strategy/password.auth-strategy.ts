import { BadRequestException, Logger } from '@nestjs/common';
import { injectable } from '../../../ioc/injectable.decorator';
import { FindOneUserUseCase } from '../../../primary-services/user/use-cases/find-one-user.use-case';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { AuthStrategy } from './auth.strategy.interface';

type Body = {
  email: string;
  password: string;
};

@injectable()
export class PasswordAuthStrategy extends AuthStrategy<Body> {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly passwordHasher: PasswordHasherPort,
  ) {
    super();
  }

  async authenticate({ email, password }: Body) {
    const found = await this.findOneUserUseCase.perform({ email });
    if (!found) {
      this.logger.log('! found');
      throw new BadRequestException('WRONG_CREDENTIALS');
    }
    const validPassword = this.passwordHasher.compare(password, found.password);
    if (!validPassword) {
      this.logger.log('! validPassword');
      throw new BadRequestException('WRONG_CREDENTIALS');
    }
    return found;
  }
}
