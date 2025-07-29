import { injectable } from '../../ioc/injectable.decorator';
import {
  AuthSignInUseCase,
  SignInBody,
} from './use-cases/auth-sign-in.use-case';
import {
  AuthSignUpUseCase,
  SignUpBody,
} from './use-cases/auth-sign-up.use-case';

@injectable()
export class AuthPrimaryService {
  constructor(
    private readonly authSignUpUseCase: AuthSignUpUseCase,
    private readonly authSignInUseCase: AuthSignInUseCase,
  ) {}

  signUp(body: SignUpBody) {
    return this.authSignUpUseCase.perform(body);
  }

  signIn(body: SignInBody) {
    return this.authSignInUseCase.perform(body);
  }
}
