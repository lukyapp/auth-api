import { Injectable } from '@nestjs/common';
import { AuthenticateUseCase } from '../../../common/use-cases/authenticate.use-case';
import { PasswordAuthStrategy } from '../../../common/strategy/auth-strategy/password.auth-strategy';

export type SignInBody = {
  email: string;
  password: string;
};

@Injectable()
export class AuthSignInUseCase {
  constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly passwordAuthStrategy: PasswordAuthStrategy,
  ) {}

  async perform(body: SignInBody) {
    return this.authenticateUseCase.perform(this.passwordAuthStrategy, body);
  }
}
