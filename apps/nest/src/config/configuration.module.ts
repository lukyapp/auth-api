import { ConfigurationServicePort } from '@auth/domain';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationServiceEnvAdapter } from './configuration.service.env-adapter';
import { validate } from './env.validation';

@Global()
@Module({
  controllers: [],
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
