import { EnvironmentVariablesDto } from './environment-variables.dto';

export abstract class ConfigurationServicePort {
  abstract get<TKey extends keyof EnvironmentVariablesDto>(
    key: TKey,
  ): EnvironmentVariablesDto[TKey];
  abstract get<TKey extends keyof EnvironmentVariablesDto>(
    key: TKey | string,
  ): EnvironmentVariablesDto[TKey] | string | undefined;
}
