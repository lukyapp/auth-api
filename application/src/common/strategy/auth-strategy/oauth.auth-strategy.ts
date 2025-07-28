import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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

@Injectable()
export class OauthAuthStrategy extends AuthStrategy<Body> {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly oauthUserCreatorStrategy: OauthUserCreatorStrategy,
    private readonly createOneUserUseCase: CreateOneUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {
    super();
  }

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
    const found = await this.findOneUserUseCase.perform({ email });
    if (found) {
      return found;
    }
    return await this.createOneUserUseCase.perform(
      this.oauthUserCreatorStrategy,
      {
        email,
      },
    );
  }
}
