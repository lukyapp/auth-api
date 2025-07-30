import { Dto } from '@auth/core';
import { AuthenticateUserResponse, OauthProviderName } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { injectable } from '@auth/di';

export class OauthSuccessBody extends Dto<OauthSuccessBody> {
  declare public readonly providerName: OauthProviderName;
  declare public readonly userId: string;
  declare public readonly accessToken: string;
  declare public readonly refreshToken: string;
}

@injectable()
export class OauthSuccessUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor() {}

  perform(body: OauthSuccessBody) {
    const { providerName, userId, refreshToken, accessToken } = body;
    this.logger.log(`oauth success with ${providerName} provider`);
    return new AuthenticateUserResponse({
      userId,
      accessToken,
      refreshToken,
    });
  }
}
