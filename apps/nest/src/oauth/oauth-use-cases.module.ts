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
import { AuthTokenServicePort } from '@auth/domain';
import { AuthTokenServiceJsonwebtokenAdapter } from '@auth/infra';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    // services
    OauthPrimaryService,
    OauthAuthStrategy,
    {
      provide: AuthTokenServicePort,
      useClass: AuthTokenServiceJsonwebtokenAdapter,
    },
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
    AuthTokenServicePort,
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
