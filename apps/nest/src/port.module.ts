import {
  AuthTokenServicePort,
  JwksServicePort,
  PasswordHasherPort,
  PublicKeyPemFromJwksUriGetterPort,
  UserRepositoryPort,
} from '@auth/domain';
import {
  AuthTokenServiceJsonwebtokenAdapter,
  JwksServiceJoseAdapter,
  PasswordHasherBcryptAdapter,
  PublicKeyPemFromJwksUriGetterJwksRsaAdapter,
  UserRepositoryMemoryAdapter,
} from '@auth/infra';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryMemoryAdapter,
    },
    {
      provide: PasswordHasherPort,
      useClass: PasswordHasherBcryptAdapter,
    },
    {
      provide: AuthTokenServicePort,
      useClass: AuthTokenServiceJsonwebtokenAdapter,
    },
    {
      provide: PublicKeyPemFromJwksUriGetterPort,
      useClass: PublicKeyPemFromJwksUriGetterJwksRsaAdapter,
    },
    {
      provide: JwksServicePort,
      useClass: JwksServiceJoseAdapter,
    },
  ],
  exports: [
    PasswordHasherPort,
    UserRepositoryPort,
    AuthTokenServicePort,
    PublicKeyPemFromJwksUriGetterPort,
    JwksServicePort,
  ],
})
export class PortModule {}
