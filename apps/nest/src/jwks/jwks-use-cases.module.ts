import {
  GetJwksUseCase,
  GetOpenIdConfigurationUseCase,
} from '@auth/application';
import { Module } from '@nestjs/common';

@Module({
  providers: [
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
