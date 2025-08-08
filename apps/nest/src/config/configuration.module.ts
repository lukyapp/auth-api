import { ConfigurationServicePort } from '@auth/domain';
import { Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Module } from '../core/di/module.decorator';
import { ConfigurationServiceEnvAdapter } from './configuration.service.env-adapter';
import { validate } from './env.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      expandVariables: true,
    }),
  ],
  providers: [
    {
      provide: ConfigurationServicePort,
      useClass: ConfigurationServiceEnvAdapter,
    },
  ],
  exports: [ConfigurationServicePort],
})
export class ConfigurationModule {}
