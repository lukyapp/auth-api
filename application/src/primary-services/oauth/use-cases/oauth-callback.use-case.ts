import { Dto } from '@auth/core';
import { AuthenticateUserResponseData, OauthProviderName } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { OauthAuthStrategy } from '../../../common/strategy/auth-strategy/oauth.auth-strategy';
import { AuthenticateUseCase } from '../../../common/use-cases/authenticate.use-case';
import { injectable } from '@auth/di';

export class OauthProfile extends Dto<OauthProfile> {
  declare public readonly id?: string;
  declare public readonly name?: string;
  declare public readonly email?: string;
  declare public readonly isEmailVerified?: boolean;
}

export class OauthValidateResult extends Dto<OauthValidateResult> {
  declare public readonly accessToken: string;
  declare public readonly refreshToken?: string;
  declare public readonly profile: OauthProfile;
}

export class OauthCallbackBody extends Dto<OauthCallbackBody> {
  declare public readonly providerName: OauthProviderName;
  declare public readonly validateResult: OauthValidateResult;
  declare public readonly successUrl: URL;
  declare public readonly isFromMobile: boolean;
}

@injectable()
export class OauthCallbackUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly authenticatorOauthStrategy: OauthAuthStrategy,
  ) {}

  async perform(body: OauthCallbackBody) {
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
