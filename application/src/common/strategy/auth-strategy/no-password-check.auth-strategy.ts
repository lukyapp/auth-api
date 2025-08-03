import { injectable } from '@auth/di';
import { BadRequestException } from '@auth/domain';
import { FindOneUserUseCase } from '../../../primary-services/user/use-cases/find-one-user.use-case';
import { GenericService } from '../../logger/generic.service';
import { AuthStrategy } from './auth.strategy.interface';

type Body = {
  email: string;
};

@injectable()
export class NoPasswordCheckAuthStrategy
  extends GenericService
  implements AuthStrategy<Body>
{
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
