import { Dto } from '@auth/core';
import { Expose, IsOptional, IsString } from '@auth/validation';

export class OauthAuthorizeEndpointQuery extends Dto<OauthAuthorizeEndpointQuery> {
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly success_callback?: string;
}
