import {
  AuthenticateUseCase,
  AuthTokenServicePort,
  CreateOneUserUseCase,
  FindOneUserUseCase,
  OauthAuthorizeUseCase,
  OauthAuthStrategy,
  OauthCallbackUseCase,
  OauthPrimaryService,
  OauthSuccessUseCase,
  OauthUserCreatorStrategy,
} from '@auth/application';
import { AuthTokenServiceNestjsLocalAdapter } from '@auth/infra';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    // services
    OauthPrimaryService,
    OauthAuthStrategy,
    {
      provide: AuthTokenServicePort,
      useClass: AuthTokenServiceNestjsLocalAdapter,
    },
    OauthUserCreatorStrategy,
    // use-cases
    OauthAuthorizeUseCase,
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
    AuthTokenServicePort,
    OauthUserCreatorStrategy,
    // use-cases
    OauthAuthorizeUseCase,
    OauthCallbackUseCase,
    OauthSuccessUseCase,
    AuthenticateUseCase,
    CreateOneUserUseCase,
    FindOneUserUseCase,
  ],
})
export class OauthUseCasesModule {}
