import { OauthConfigProxy } from '#controllers/http/oauth-config.proxy'
import InternalServerErrorException from '#exceptions/internal_server_error_exception'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Session } from '@adonisjs/session'
import { OauthPrimaryService, OauthValidateResult, ValidationService } from '@auth/application'
import { OauthEndpointParam, OauthSuccessEndpointQuery } from '@auth/controller-dtos'

@inject()
export default class OauthController {
  constructor(
    private readonly oauthPrimaryService: OauthPrimaryService,
    private readonly oauthConfigProxy: OauthConfigProxy
  ) {}

  authorize({ request, ally }: HttpContext) {
    const { oauthProviderName } = ValidationService.validate(OauthEndpointParam, request.params())
    return ally.use(oauthProviderName).redirect()
    // const config = this.getOauthConfig(oauthProviderName)
    // return ally.use(oauthProviderName).redirect((request) => {
    //   request.scopes(config.scope)
    //   request.param('allow_signup', false)
    // })
  }

  async callback({ ally, request, response, session }: HttpContext) {
    const { oauthProviderName } = ValidationService.validate(OauthEndpointParam, request.params())
    const oauthProvider = ally.use(oauthProviderName)

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (oauthProvider.accessDenied()) {
      return 'You have cancelled the login process'
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (oauthProvider.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    /**
     * OAuth provider responded with some error
     */
    if (oauthProvider.hasError()) {
      return oauthProvider.getError()
    }

    /**
     * Access user info
     */
    const user = await oauthProvider.user()
    const validateResult = new OauthValidateResult({
      accessToken: user.token.token,
      refreshToken: user.token.refreshToken,
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.emailVerificationState === 'verified',
      },
    })

    const userAgent = request.header('user-agent')
    const isFromMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent ?? '')
    const successUrl = this.getSuccessUrl(session, { oauthProviderName })

    const callbackUrl = await this.oauthPrimaryService.callback({
      validateResult,
      isFromMobile,
      successUrl,
      providerName: oauthProviderName,
    })

    response.redirect(callbackUrl)
  }

  success({ request }: HttpContext) {
    const { oauthProviderName } = ValidationService.validate(OauthEndpointParam, request.params())
    const { userId, accessToken, refreshToken } = ValidationService.validate(
      OauthSuccessEndpointQuery,
      request.qs()
    )
    return this.oauthPrimaryService.success({
      providerName: oauthProviderName,
      userId,
      accessToken,
      refreshToken,
    })
  }

  private getSuccessUrl(session: Session, { oauthProviderName }: OauthEndpointParam) {
    const successCallback = session.get('successCallback') as string | undefined
    if (successCallback) {
      return new URL(successCallback)
    } else {
      const config = this.getOauthConfig(oauthProviderName)
      return new URL(config.successURL)
    }
  }

  private getOauthConfig(oauthProviderName: OauthEndpointParam['oauthProviderName']) {
    const config = this.oauthConfigProxy.resolve(oauthProviderName)
    if (!config) {
      throw new InternalServerErrorException()
    }
    return config
  }
}
