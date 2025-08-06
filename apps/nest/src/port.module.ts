import { LoggerManager } from '@auth/application';
import {
  JwtServicePort,
  JwksServicePort,
  LoggerStrategyFactoryPort,
  PasswordHasherPort,
  PublicKeyPemFromJwksUriGetterPort,
  UserRepositoryPort,
} from '@auth/domain';
import {
  JwtServiceJsonwebtokenAdapter,
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
      provide: JwtServicePort,
      useClass: JwtServiceJsonwebtokenAdapter,
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
    JwtServicePort,
    PublicKeyPemFromJwksUriGetterPort,
    JwksServicePort,
  ],
})
export class PortModule {}
