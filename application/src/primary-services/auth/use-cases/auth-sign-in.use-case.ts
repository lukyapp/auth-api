import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
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
export class AuthSignInUseCase {
  constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly passwordAuthStrategy: PasswordAuthStrategy,
  ) {}

  async perform(body: SignInBody) {
    return this.authenticateUseCase.perform(this.passwordAuthStrategy, body);
  }
}
