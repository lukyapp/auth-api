import { OauthProviderName } from '@auth/domain';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { Dto } from '../../core/dto';

export class OauthEndpointParam extends Dto<OauthEndpointParam> {
  @Expose()
  @IsEnum(OauthProviderName)
  declare public readonly oauthProviderName: OauthProviderName;
}
