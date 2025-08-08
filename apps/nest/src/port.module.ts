import { LoggerManager } from '@auth/application';
import {
  JwksServicePort,
  JwtServicePort,
  LoggerStrategyFactoryPort,
  PasswordHasherPort,
  PublicKeyPemFromJwksUriGetterPort,
  UserRepositoryPort,
} from '@auth/domain';
import {
  JwksServiceJoseAdapter,
  JwtServiceJsonwebtokenAdapter,
  LoggerStrategyFactoryNestLoggerAdapter,
  PasswordHasherBcryptAdapter,
  PublicKeyPemFromJwksUriGetterJwksRsaAdapter,
  UserRepositoryMemoryAdapter,
} from '@auth/infra';
import { Global } from '@nestjs/common';
import { Module } from './core/di/module.decorator';

@Global()
@Module({
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
    {
      provide: LoggerStrategyFactoryPort,
      useClass: LoggerStrategyFactoryNestLoggerAdapter,
    },
    LoggerManager,
  ],
  exports: [
    PasswordHasherPort,
    UserRepositoryPort,
    JwtServicePort,
    PublicKeyPemFromJwksUriGetterPort,
    JwksServicePort,
    LoggerStrategyFactoryPort,
  ],
})
export class PortModule {}
