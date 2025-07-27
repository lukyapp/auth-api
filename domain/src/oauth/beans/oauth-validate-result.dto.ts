import { Dto } from '@auth/core';
import { OauthProfile } from './oauth-profile.dto';

export class OauthValidateResult extends Dto<OauthValidateResult> {
  declare public readonly accessToken: string;
  declare public readonly refreshToken?: string;
  declare public readonly profile: OauthProfile;
}
