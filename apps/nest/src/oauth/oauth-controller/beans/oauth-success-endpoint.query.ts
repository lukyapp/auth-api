import { Dto } from '@auth/core';
import { IsString } from 'class-validator';

export class OauthSuccessEndpointQuery extends Dto<OauthSuccessEndpointQuery> {
  @IsString()
  declare public readonly userId: string;
  @IsString()
  declare public readonly accessToken: string;
  @IsString()
  declare public readonly refreshToken: string;
}
