import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Dto } from '../../core/dto';

export class OauthAuthorizeEndpointQuery extends Dto<OauthAuthorizeEndpointQuery> {
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly success_callback?: string;
}
