import { PasswordAuthStrategy } from '../../../common/strategy/auth-strategy/password.auth-strategy';
import { AuthenticateUseCase } from '../../../common/use-cases/authenticate.use-case';
import { injectable } from '../../../ioc/injectable.decorator';

export type SignInBody = {
  email: string;
  password: string;
};

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
