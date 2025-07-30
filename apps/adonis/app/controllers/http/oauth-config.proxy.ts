import { GoogleOauthConfig } from '#controllers/http/google/google-oauth.config'
import { inject } from '@adonisjs/core'
import { ObjectProxy } from '@auth/core'

@inject()
export class OauthConfigProxy extends ObjectProxy<{
  google: GoogleOauthConfig
}> {
  constructor(googleOauthConfig: GoogleOauthConfig) {
    super({
      google: googleOauthConfig,
    })
  }
}
