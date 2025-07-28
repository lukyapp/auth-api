import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class OauthAuthorizeEndpointQuery extends Dto<OauthAuthorizeEndpointQuery> {
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly success_callback?: string;
}
