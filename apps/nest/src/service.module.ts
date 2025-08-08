import {
  GenerateAccessJwtUseCase,
  GenerateRefreshJwtUseCase,
  JwksUriGetter,
  LocalPublicJwkGetterStrategy,
  OpenIdPublicJwkGetterStrategy,
  PrivateKeyGetter,
  PublicKeyGetter,
} from '@auth/application';
import { Global } from '@nestjs/common';
import { Module } from './core/di/module.decorator';

@Global()
@Module({
  providers: [
    JwksUriGetter,
    PrivateKeyGetter,
    PublicKeyGetter,
    OpenIdPublicJwkGetterStrategy,
    LocalPublicJwkGetterStrategy,
    GenerateAccessJwtUseCase,
    GenerateRefreshJwtUseCase,
  ],
  exports: [
    JwksUriGetter,
    PrivateKeyGetter,
    PublicKeyGetter,
    OpenIdPublicJwkGetterStrategy,
    LocalPublicJwkGetterStrategy,
    GenerateAccessJwtUseCase,
    GenerateRefreshJwtUseCase,
  ],
})
export class ServiceModule {}
