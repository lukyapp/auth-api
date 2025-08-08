import {
  GetJwksUseCase,
  GetOpenIdConfigurationUseCase,
} from '@auth/application';
import { Module } from '../core/di/module.decorator';

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
