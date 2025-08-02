import {
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
  ],
  exports: [
    JwksUriGetter,
    PrivateKeyGetter,
    PublicKeyGetter,
    OpenIdPublicJwkGetterStrategy,
    LocalPublicJwkGetterStrategy,
  ],
})
export class ServiceModule {}
