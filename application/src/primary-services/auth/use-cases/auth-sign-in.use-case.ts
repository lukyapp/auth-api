import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { GenericService } from '../../../common/logger/generic.service';
import { PasswordAuthStrategy } from '../../../common/strategy/auth-strategy/password.auth-strategy';
import { AuthenticateUseCase } from '../../../common/use-cases/authenticate.use-case';

export class SignInBody extends Dto<SignInBody> {
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email: string;
  @Expose()
  @IsString()
  declare public readonly password: string;
}

@injectable()
export class AuthSignInUseCase extends GenericService {
  constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly passwordAuthStrategy: PasswordAuthStrategy,
  ) {
    super();
  }

  async perform(body: SignInBody) {
    this.logger.log('lala');
    return this.authenticateUseCase.perform(this.passwordAuthStrategy, body);
  }
}
