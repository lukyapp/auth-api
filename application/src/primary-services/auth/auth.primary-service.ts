import { Injectable } from '@nestjs/common';
import {
  AuthSignUpUseCase,
  SignUpBody,
} from './use-cases/auth-sign-up.use-case';
import {
  AuthSignInUseCase,
  SignInBody,
} from './use-cases/auth-sign-in.use-case';

@Injectable()
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
