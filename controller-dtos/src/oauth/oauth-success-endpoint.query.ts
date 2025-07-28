import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

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
