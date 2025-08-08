import {
  AuthSignInUseCase,
  AuthSignUpUseCase,
  PasswordAuthStrategy,
} from '@auth/application';
import { Module } from '../core/di/module.decorator';
import { OauthUseCasesModule } from '../oauth/oauth-use-cases.module';
import { UserUseCasesModule } from '../user/user-use-cases.module';

@Module({
  imports: [UserUseCasesModule, OauthUseCasesModule],
  providers: [
    // services
    PasswordAuthStrategy,
    // use-cases
    AuthSignUpUseCase,
    AuthSignInUseCase,
  ],
  exports: [
    // services
    PasswordAuthStrategy,
    // use-cases
    AuthSignUpUseCase,
    AuthSignInUseCase,
  ],
})
export class AuthUseCasesModule {}
