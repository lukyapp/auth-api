import { Dto } from '@auth/core';
import { OauthProviderName } from '@auth/domain';
import { Expose, IsEnum } from '@auth/validation';

export class OauthEndpointParam extends Dto<OauthEndpointParam> {
  @Expose()
  @IsEnum(OauthProviderName)
  declare public readonly oauthProviderName: OauthProviderName;
}
