/*
|--------------------------------------------------------------------------
| IOC file
|--------------------------------------------------------------------------
|
*/

import { GoogleOauthConfig } from '#controllers/oauth/google/google-oauth.config'
import { resolveMany } from '#start/resolveMany.util'
import app from '@adonisjs/core/services/app'
import { LoggerManager } from '@auth/application'
import { Utils } from '@auth/core'
import {
  JwtServicePort,
  ConfigurationServicePort,
  PasswordHasherPort,
  UserRepositoryPort,
  JwksServicePort,
  PublicKeyPemFromJwksUriGetterPort,
  LoggerStrategyFactoryPort,
} from '@auth/domain'
import {
  JwtServiceJsonwebtokenAdapter,
  PasswordHasherBcryptAdapter,
  UserRepositoryMemoryAdapter,
  JwksServiceJoseAdapter,
  PublicKeyPemFromJwksUriGetterJwksRsaAdapter,
  LoggerStrategyFactoryNestLoggerAdapter,
} from '@auth/infra'
import { ConfigurationServiceEnvAdapter } from '../app/config/configuration.service.env-adapter.js'

app.container.singleton(ConfigurationServicePort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new ConfigurationServiceEnvAdapter(...deps)
})

/*
  |----------------------------------------------------------
  | repository
  |----------------------------------------------------------
  */

app.container.singleton(UserRepositoryPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new UserRepositoryMemoryAdapter(...deps)
})

/*
  |----------------------------------------------------------
  | auth
  |----------------------------------------------------------
  */

app.container.singleton(PasswordHasherPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new PasswordHasherBcryptAdapter(...deps)
})
app.container.singleton(JwtServicePort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new JwtServiceJsonwebtokenAdapter(...deps)
})

/*
  |----------------------------------------------------------
  | oauth
  |----------------------------------------------------------
  */

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

/*
  |----------------------------------------------------------
  | jwks
  |----------------------------------------------------------
  */

app.container.singleton(JwksServicePort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new JwksServiceJoseAdapter(...deps)
})
app.container.singleton(PublicKeyPemFromJwksUriGetterPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new PublicKeyPemFromJwksUriGetterJwksRsaAdapter(...deps)
})

/*
  |----------------------------------------------------------
  | logging
  |----------------------------------------------------------
  */

app.container.singleton(LoggerStrategyFactoryPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new LoggerStrategyFactoryNestLoggerAdapter(...deps)
})
app.container.singleton(LoggerManager, async function (resolver) {
  const deps = await resolveMany(resolver, [LoggerStrategyFactoryPort])
  return new LoggerManager(...deps)
})
// to trigger the constructor
app.container.make(LoggerManager)
