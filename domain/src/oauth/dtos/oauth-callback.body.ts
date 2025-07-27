import { Dto } from '@auth/core';
import { OauthValidateResult } from '../beans/oauth-validate-result.dto';

import { OauthProviderName } from './oauth-provider-name.enum';

export class OauthCallbackBody extends Dto<OauthCallbackBody> {
  declare public readonly providerName: OauthProviderName;
  declare public readonly validateResult: OauthValidateResult;
  declare public readonly successUrl: URL;
  declare public readonly isFromMobile: boolean;
}
