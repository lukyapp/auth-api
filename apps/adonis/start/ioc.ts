/*
|--------------------------------------------------------------------------
| IOC file
|--------------------------------------------------------------------------
|
*/

import { GoogleOauthConfig } from '#controllers/oauth/google/google-oauth.config'
import { resolveMany } from '#start/resolveMany.util'
import app from '@adonisjs/core/services/app'
import { Utils } from '@auth/core'
import {
  AuthTokenServicePort,
  ConfigurationServicePort,
  PasswordHasherPort,
  UserRepositoryPort,
  JwksServicePort,
} from '@auth/domain'
import {
  AuthTokenServiceJsonwebtokenAdapter,
  PasswordHasherBcryptAdapter,
  UserRepositoryMemoryAdapter,
  JwksServiceJoseAdapter,
} from '@auth/infra'
import { ConfigurationServiceEnvAdapter } from '../app/config/configuration.service.env-adapter.js'

app.container.singleton(ConfigurationServicePort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new ConfigurationServiceEnvAdapter(...deps)
})
app.container.singleton(UserRepositoryPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new UserRepositoryMemoryAdapter(...deps)
})
app.container.singleton(PasswordHasherPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new PasswordHasherBcryptAdapter(...deps)
})
app.container.singleton(AuthTokenServicePort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new AuthTokenServiceJsonwebtokenAdapter(...deps)
})
app.container.singleton(GoogleOauthConfig, async function (resolver) {
  const [configurationService] = await resolveMany(resolver, [ConfigurationServicePort])
  return new GoogleOauthConfig({
    clientID: configurationService.get('oauth.google.clientId'),
    clientSecret: configurationService.get('oauth.google.clientSecret'),
    callbackURL: Utils.urlJoin(
      configurationService.get('server.baseUrl'),
      '/oauth/google/callback'
    ),
    successURL: Utils.urlJoin(configurationService.get('server.baseUrl'), '/oauth/google/success'),
  })
})
app.container.singleton(JwksServicePort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new JwksServiceJoseAdapter(...deps)
})
