/*
|--------------------------------------------------------------------------
| IOC file
|--------------------------------------------------------------------------
|
*/

import { resolveMany } from '#start/resolveMany.util'
import app from '@adonisjs/core/services/app'
import { AuthTokenServicePort, PasswordHasherPort, UserRepositoryPort } from '@auth/application'
import {
  AuthTokenServiceAdonisLocalAdapter,
  PasswordHasherBcryptAdapter,
  UserRepositoryMemoryAdapter,
} from '@auth/infra'

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
  return new AuthTokenServiceAdonisLocalAdapter(...deps)
})
