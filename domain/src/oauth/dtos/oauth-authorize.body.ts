import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';

import { OauthProviderName } from './oauth-provider-name.enum';

export class OauthAuthorizeBody extends Dto<OauthAuthorizeBody> {
  @Expose()
  declare public readonly oauthProviderName: OauthProviderName;
}
