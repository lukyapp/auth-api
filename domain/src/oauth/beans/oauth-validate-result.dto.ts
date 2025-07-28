import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { OauthProfile } from './oauth-profile.dto';

export class OauthValidateResult extends Dto<OauthValidateResult> {
  @Expose()
  declare public readonly accessToken: string;
  @Expose()
  declare public readonly refreshToken?: string;
  @Expose()
  declare public readonly profile: OauthProfile;
}
