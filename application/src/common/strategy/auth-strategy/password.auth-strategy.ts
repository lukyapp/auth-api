import { PasswordHasherPort } from '@auth/domain';
import { BadRequestException } from '@auth/domain';
import { injectable } from '@auth/di';
import { FindOneUserUseCase } from '../../../primary-services/user/use-cases/find-one-user.use-case';
import { GenericService } from '../../logger/generic.service';
import { AuthStrategy } from './auth.strategy.interface';

type Body = {
  email: string;
  password: string;
};

@injectable()
export class PasswordAuthStrategy
  extends GenericService
  implements AuthStrategy<Body>
{
  constructor(
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly passwordHasher: PasswordHasherPort,
  ) {
    super();
  }

  async authenticate({ email, password }: Body) {
    const { data: found } = await this.findOneUserUseCase.perform({ email });
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
