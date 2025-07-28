import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { OauthValidateResult } from '../beans/oauth-validate-result.dto';

import { OauthProviderName } from './oauth-provider-name.enum';

export class OauthCallbackBody extends Dto<OauthCallbackBody> {
  @Expose()
  declare public readonly providerName: OauthProviderName;
  @Expose()
  declare public readonly validateResult: OauthValidateResult;
  @Expose()
  declare public readonly successUrl: URL;
  @Expose()
  declare public readonly isFromMobile: boolean;
}
