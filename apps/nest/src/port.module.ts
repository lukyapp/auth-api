import { LoggerManager } from '@auth/application';
import {
  AuthTokenServicePort,
  JwksServicePort,
  LoggerStrategyFactoryPort,
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
  LoggerStrategyFactoryNestLoggerAdapter,
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
    LoggerManager,
    {
      provide: LoggerStrategyFactoryPort,
      useClass: LoggerStrategyFactoryNestLoggerAdapter,
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
