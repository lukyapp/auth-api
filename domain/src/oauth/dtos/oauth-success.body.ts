import { Dto } from '@auth/core';

import { OauthProviderName } from './oauth-provider-name.enum';

export class OauthSuccessBody extends Dto<OauthSuccessBody> {
  declare public readonly providerName: OauthProviderName;
  declare public readonly userId: string;
  declare public readonly accessToken: string;
  declare public readonly refreshToken: string;
}
