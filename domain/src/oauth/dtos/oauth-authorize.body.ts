import { Dto } from '@auth/core';

import { OauthProviderName } from './oauth-provider-name.enum';

export class OauthAuthorizeBody extends Dto<OauthAuthorizeBody> {
  declare public readonly oauthProviderName: OauthProviderName;
}
