import { injectable } from '@auth/di';
import { GetJwksUseCase } from './use-cases/get-jwks.use-case';
import { GetOpenIdConfigurationUseCase } from './use-cases/get-open-id-configuration.use-case';

@injectable()
export class JwksPrimaryService {
  constructor(
    private readonly getJwksUseCase: GetJwksUseCase,
    private readonly getOpenIdConfigurationUseCase: GetOpenIdConfigurationUseCase,
  ) {}

  getJwks() {
    return this.getJwksUseCase.perform();
  }

  getOpenidConfiguration() {
    return this.getOpenIdConfigurationUseCase.perform();
  }
}
