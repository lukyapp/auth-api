import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import { OauthProviderName } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { AuthenticateUserResponse } from '../../../common/use-cases/authenticate.use-case';

export class OauthSuccessBody extends Dto<OauthSuccessBody> {
  @Expose()
  @IsEnum(OauthProviderName)
  declare public readonly providerName: OauthProviderName;
  @Expose()
  @IsString()
  declare public readonly userId: string;
  @Expose()
  @IsString()
  declare public readonly accessToken: string;
  @Expose()
  @IsString()
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
