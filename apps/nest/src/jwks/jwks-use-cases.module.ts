import {
  GetJwksUseCase,
  GetOpenIdConfigurationUseCase,
} from '@auth/application';
import { JwksServicePort } from '@auth/domain';
import { JwksServiceJoseAdapter } from '@auth/infra';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    // ports
    {
      provide: JwksServicePort,
      useClass: JwksServiceJoseAdapter,
    },
    // use-cases
    GetJwksUseCase,
    GetOpenIdConfigurationUseCase,
  ],
  exports: [
    // use-cases
    GetJwksUseCase,
    GetOpenIdConfigurationUseCase,
  ],
})
export class JwksUseCasesModule {}
