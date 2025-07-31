import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import { Nested, OauthProviderName } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { OauthAuthStrategy } from '../../../common/strategy/auth-strategy/oauth.auth-strategy';
import {
  AuthenticateUseCase,
  AuthenticateUserResponse,
} from '../../../common/use-cases/authenticate.use-case';

export class OauthProfile extends Dto<OauthProfile> {
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly id?: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly name?: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly email?: string;
  @Expose()
  @IsBoolean()
  @IsOptional()
  declare public readonly isEmailVerified?: boolean;
}

export class OauthValidateResult extends Dto<OauthValidateResult> {
  @Expose()
  @IsString()
  declare public readonly accessToken: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly refreshToken?: string;
  @Expose()
  @Nested(() => OauthProfile)
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

    const authenticateUserResponse = await this.authenticateUseCase.perform(
      this.authenticatorOauthStrategy,
      profile,
    );
    return this.buildSuccessUrl(successUrl, authenticateUserResponse);
  }

  private buildSuccessUrl(
    baseUrl: URL,
    { data: { userId, accessToken, refreshToken } }: AuthenticateUserResponse,
  ) {
    baseUrl.searchParams.append('userId', userId);
    baseUrl.searchParams.append('accessToken', accessToken);
    if (refreshToken) {
      baseUrl.searchParams.append('refreshToken', refreshToken);
    }
    return baseUrl.toString();
  }
}
