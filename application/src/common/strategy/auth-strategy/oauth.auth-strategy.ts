import { injectable } from '@auth/di';
import { BadRequestException } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { CreateOneUserUseCase } from '../../../primary-services/user/use-cases/create-one-user.use-case';
import { FindOneUserUseCase } from '../../../primary-services/user/use-cases/find-one-user.use-case';
import { OauthUserCreatorStrategy } from '../user-creator-strategy/oauth.user-creator-strategy';
import { AuthStrategy } from './auth.strategy.interface';

type Body = {
  id?: string;
  name?: string;
  email?: string;
  isEmailVerified?: boolean;
};

@injectable()
export class OauthAuthStrategy implements AuthStrategy<Body> {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly oauthUserCreatorStrategy: OauthUserCreatorStrategy,
    private readonly createOneUserUseCase: CreateOneUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async authenticate({ email, isEmailVerified }: Body) {
    if (!isEmailVerified) {
      this.logger.log('! oauthProfile.isEmailVerified');
      throw new BadRequestException(
        'can not authenticate with that provider case your email was not verified',
      );
    }
    if (!email) {
      this.logger.log('! oauthProfile.email');
      throw new BadRequestException('WRONG_CREDENTIALS');
    }
    const { data: found } = await this.findOneUserUseCase.perform({ email });
    if (found) {
      return found;
    }
    return this.createOneUserUseCase.perform(this.oauthUserCreatorStrategy, {
      email,
    });
  }
}
