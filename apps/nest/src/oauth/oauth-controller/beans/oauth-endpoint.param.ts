import { Dto } from '@auth/core';
import { OauthProviderName } from '@auth/domain';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class OauthEndpointParam extends Dto<OauthEndpointParam> {
  @Expose()
  @IsEnum(OauthProviderName)
  declare public readonly oauthProviderName: OauthProviderName;
}
