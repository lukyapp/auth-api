import {
  AuthenticateUserResponse,
  AuthenticateUserResponseData,
  OauthAuthorizeBody,
  OauthCallbackBody,
  OauthSuccessBody,
} from '@auth/domain';
import { Logger } from '@nestjs/common';
import { AuthenticateUseCase } from './use-cases/authenticate.use-case';
import { OauthAuthStrategy } from './use-cases/oauth.auth-strategy';

export class OauthPrimaryService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly authenticatorOauthStrategy: OauthAuthStrategy,
  ) {}

  authorize({ oauthProviderName }: OauthAuthorizeBody): void | Promise<void> {
    this.logger.log(`oauth authorize with ${oauthProviderName} provider`);
  }

  async getCallbackUrl(body: OauthCallbackBody): Promise<string> {
    const {
      validateResult: { profile },
      providerName,
      successUrl,
      isFromMobile,
    } = body;
    this.logger.log(
      `oauth callback with ${providerName} provider and ${isFromMobile ? 'mobile' : 'web'} agent`,
    );

    const authenticateUserResponseData = await this.authenticateUseCase.perform(
      this.authenticatorOauthStrategy,
      profile,
    );
    return this.buildSuccessUrl(successUrl, authenticateUserResponseData);
  }

  success(body: OauthSuccessBody) {
    const { providerName, userId, refreshToken, accessToken } = body;
    this.logger.log(`oauth success with ${providerName} provider`);
    return new AuthenticateUserResponse({
      userId,
      accessToken,
      refreshToken,
    });
  }

  private buildSuccessUrl(
    baseUrl: URL,
    { userId, accessToken, refreshToken }: AuthenticateUserResponseData,
  ) {
    baseUrl.searchParams.append('userId', userId);
    baseUrl.searchParams.append('accessToken', accessToken);
    if (refreshToken) {
      baseUrl.searchParams.append('refreshToken', refreshToken);
    }
    return baseUrl.toString();
  }
}
