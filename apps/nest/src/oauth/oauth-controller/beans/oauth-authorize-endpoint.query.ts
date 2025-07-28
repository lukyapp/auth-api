import { Dto } from '@auth/core';
import { IsOptional, IsString } from 'class-validator';

export class OauthAuthorizeEndpointQuery extends Dto<OauthAuthorizeEndpointQuery> {
  @IsString()
  @IsOptional()
  declare public readonly success_callback?: string;
}
