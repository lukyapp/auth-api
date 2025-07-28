import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';

import { OauthProviderName } from './oauth-provider-name.enum';

export class OauthSuccessBody extends Dto<OauthSuccessBody> {
  @Expose()
  declare public readonly providerName: OauthProviderName;
  @Expose()
  declare public readonly userId: string;
  @Expose()
  declare public readonly accessToken: string;
  @Expose()
  declare public readonly refreshToken: string;
}
