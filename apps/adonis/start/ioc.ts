/*
|--------------------------------------------------------------------------
| IOC file
|--------------------------------------------------------------------------
|
*/

import { resolveMany } from '#start/resolveMany.util'
import app from '@adonisjs/core/services/app'
import {
  AuthenticateUseCase,
  AuthPrimaryService,
  AuthSignInUseCase,
  AuthSignUpUseCase,
  AuthTokenServicePort,
  CreateOneUserUseCase,
  FindOneUserUseCase,
  PasswordAuthStrategy,
  PasswordHasherPort,
  PasswordUserCreatorStrategy,
  UserRepositoryPort,
} from '@auth/application'
import {
  AuthTokenServiceAdonisLocalAdapter,
  PasswordHasherBcryptAdapter,
  UserRepositoryMemoryAdapter,
} from '@auth/infra'

app.container.singleton(AuthPrimaryService, async function (resolver) {
  const deps = await resolveMany(resolver, [AuthSignUpUseCase, AuthSignInUseCase])
  return new AuthPrimaryService(...deps)
})

app.container.singleton(AuthSignUpUseCase, async function (resolver) {
  const deps = await resolveMany(resolver, [
    CreateOneUserUseCase,
    PasswordUserCreatorStrategy,
    AuthSignInUseCase,
  ])
  return new AuthSignUpUseCase(...deps)
})
app.container.singleton(PasswordUserCreatorStrategy, async function (resolver) {
  const deps = await resolveMany(resolver, [UserRepositoryPort, PasswordHasherPort])
  return new PasswordUserCreatorStrategy(...deps)
})
app.container.singleton(UserRepositoryPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new UserRepositoryMemoryAdapter(...deps)
})
app.container.singleton(PasswordHasherPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new PasswordHasherBcryptAdapter(...deps)
})
app.container.singleton(PasswordHasherPort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new PasswordHasherBcryptAdapter(...deps)
})

app.container.singleton(AuthSignInUseCase, async function (resolver) {
  const deps = await resolveMany(resolver, [AuthenticateUseCase, PasswordAuthStrategy])
  return new AuthSignInUseCase(...deps)
})
app.container.singleton(AuthenticateUseCase, async function (resolver) {
  const deps = await resolveMany(resolver, [AuthTokenServicePort])
  return new AuthenticateUseCase(...deps)
})
app.container.singleton(AuthTokenServicePort, async function (resolver) {
  const deps = await resolveMany(resolver, [])
  return new AuthTokenServiceAdonisLocalAdapter(...deps)
})
app.container.singleton(PasswordAuthStrategy, async function (resolver) {
  const deps = await resolveMany(resolver, [FindOneUserUseCase, PasswordHasherPort])
  return new PasswordAuthStrategy(...deps)
})
app.container.singleton(FindOneUserUseCase, async function (resolver) {
  const deps = await resolveMany(resolver, [UserRepositoryPort])
  return new FindOneUserUseCase(...deps)
})
