import { resolveMany } from '#start/resolveMany.util'
import { defineConfig } from '@adonisjs/auth'
import { Authenticators, InferAuthEvents } from '@adonisjs/auth/types'
import {
  AuthenticateUseCase,
  NoPasswordCheckAuthStrategy,
  OpenIdPublicJwkGetterStrategy,
  PublicKeyGetter,
} from '@auth/application'
import { AuthTokenServicePort, ConfigurationServicePort, UserRepositoryPort } from '@auth/domain'
import { JwtGuard } from '../app/guards/jwt-auth.guard.js'

const authConfig = defineConfig({
  default: 'openId',
  guards: {
    openId: {
      resolver: async (_name, app) => {
        const deps = await resolveMany(app.container, [
          AuthTokenServicePort,
          ConfigurationServicePort,
          UserRepositoryPort,
          PublicKeyGetter,
          OpenIdPublicJwkGetterStrategy,
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
