import env from '#start/env'
import { inject } from '@adonisjs/core'
import { ConfigurationServicePort, EnvironmentVariablesDto } from '@auth/domain'

@inject()
export class ConfigurationServiceEnvAdapter implements ConfigurationServicePort {
  get<TKey extends keyof EnvironmentVariablesDto>(key: TKey): EnvironmentVariablesDto[TKey] {
    // @ts-expect-error TODO
    return env.get(key)
  }
}
