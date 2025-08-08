import { Dto } from '@auth/core';
import { Expose, IsString } from '@auth/validation';

export class OauthSuccessEndpointQuery extends Dto<OauthSuccessEndpointQuery> {
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
