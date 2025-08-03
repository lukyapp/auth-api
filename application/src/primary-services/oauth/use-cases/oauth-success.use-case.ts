import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import { OauthProviderName } from '@auth/domain';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { GenericService } from '../../../common/logger/generic.service';
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
  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly expiresIn: number;
  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly refreshExpiresIn: number;
}

@injectable()
export class OauthSuccessUseCase extends GenericService {
  perform(body: OauthSuccessBody) {
    const {
      providerName,
      userId,
      refreshToken,
      accessToken,
      refreshExpiresIn,
      expiresIn,
    } = body;
    this.logger.log(`oauth success with ${providerName} provider`);
    return new AuthenticateUserResponse({
      userId,
      accessToken,
      refreshToken,
      refreshExpiresIn,
      expiresIn,
    });
  }
}
