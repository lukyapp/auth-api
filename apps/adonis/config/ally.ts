import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'
import { InferSocialProviders } from '@adonisjs/ally/types'
import { Utils } from '@auth/core'

const allyConfig = defineConfig({
  google: services.google({
    clientId: env.get('oauth.google.clientId')!,
    clientSecret: env.get('oauth.google.clientSecret')!,
    callbackUrl: Utils.urlJoin(env.get('server.baseUrl')!, '/oauth/google/callback'),
    userInfoUrl: 'https://openidconnect.googleapis.com/v1/userinfo',
    scopes: ['userinfo.email'],
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  export interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
