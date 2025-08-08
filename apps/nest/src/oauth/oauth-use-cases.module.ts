import {
  AuthenticateUseCase,
  CreateOneUserUseCase,
  FindOneUserUseCase,
  OauthAuthStrategy,
  OauthCallbackUseCase,
  OauthPrimaryService,
  OauthSuccessUseCase,
  OauthUserCreatorStrategy,
} from '@auth/application';
import { Module } from '../core/di/module.decorator';

@Module({
  providers: [
    // services
    OauthPrimaryService,
    OauthAuthStrategy,
    OauthUserCreatorStrategy,
    // use-cases
    OauthCallbackUseCase,
    OauthSuccessUseCase,
    AuthenticateUseCase,
    CreateOneUserUseCase,
    FindOneUserUseCase,
  ],
  exports: [
    // services
    OauthPrimaryService,
    OauthAuthStrategy,
    OauthUserCreatorStrategy,
    // use-cases
    OauthCallbackUseCase,
    OauthSuccessUseCase,
    AuthenticateUseCase,
    CreateOneUserUseCase,
    FindOneUserUseCase,
  ],
})
export class OauthUseCasesModule {}
