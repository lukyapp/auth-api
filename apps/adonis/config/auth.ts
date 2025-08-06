import { resolveMany } from '#start/resolveMany.util'
import { defineConfig } from '@adonisjs/auth'
import { Authenticators, InferAuthEvents } from '@adonisjs/auth/types'
import {
  AuthenticateUseCase,
  LocalPublicJwkGetterStrategy,
  NoPasswordCheckAuthStrategy,
  OpenIdPublicJwkGetterStrategy,
  VerifyJwtUseCase,
} from '@auth/application'
import { UserRepositoryPort } from '@auth/domain'
import { JwtGuard } from '../app/guards/jwt-auth.guard.js'

const authConfig = defineConfig({
  default: 'openId',
  guards: {
    openId: {
      resolver: async (_name, app) => {
        const deps = await resolveMany(app.container, [
          VerifyJwtUseCase,
          OpenIdPublicJwkGetterStrategy,
          UserRepositoryPort,
          AuthenticateUseCase,
          NoPasswordCheckAuthStrategy,
        ])
        return (ctx) => {
          return new JwtGuard(ctx, ...deps)
        }
      },
    },
    local: {
      resolver: async (_name, app) => {
        const deps = await resolveMany(app.container, [
          VerifyJwtUseCase,
          LocalPublicJwkGetterStrategy,
          UserRepositoryPort,
          AuthenticateUseCase,
          NoPasswordCheckAuthStrategy,
        ])
        return (ctx) => {
          return new JwtGuard(ctx, ...deps)
        }
      },
    },
  },
})

export default authConfig

declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
