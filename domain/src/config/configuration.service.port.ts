import { EnvironmentVariablesDto } from './environment-variables.dto';

export abstract class ConfigurationServicePort {
  abstract get<TKey extends keyof EnvironmentVariablesDto>(
    key: TKey,
  ): EnvironmentVariablesDto[TKey];
}
