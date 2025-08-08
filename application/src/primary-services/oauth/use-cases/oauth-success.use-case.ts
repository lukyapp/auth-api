import { injectable } from '@auth/di';
import { Body, OauthProviderName } from '@auth/domain';
import {
  Expose,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
} from '@auth/validation';
import { GenericService } from '../../../common/logger/generic.service';
import { AuthenticateUserResponse } from '../../../common/use-cases/authenticate.use-case';

export class OauthSuccessBody extends Body<OauthSuccessBody> {
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
      accessToken,
      expiresIn,
      refreshToken,
      refreshExpiresIn,
    } = body;
    this.logger.log(`oauth success with ${providerName} provider`);
    return new AuthenticateUserResponse({
      userId,
      accessToken: {
        type: 'Bearer',
        token: accessToken,
        expiresIn: expiresIn,
      },
      refreshToken: {
        type: 'Bearer',
        token: refreshToken,
        expiresIn: refreshExpiresIn,
      },
    });
  }
}
