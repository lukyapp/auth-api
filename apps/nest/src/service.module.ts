import {
  GenerateAccessJwtUseCase,
  GenerateRefreshJwtUseCase,
  JwksUriGetter,
  LocalPublicJwkGetterStrategy,
  OpenIdPublicJwkGetterStrategy,
  PrivateKeyGetter,
  PublicKeyGetter,
} from '@auth/application';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
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
