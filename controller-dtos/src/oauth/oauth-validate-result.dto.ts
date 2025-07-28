import { Dto } from '@auth/core';
import { Nested } from '@auth/domain';
import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

class OauthProfile extends Dto<OauthProfile> {
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly id?: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly name?: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly email?: string;
  @Expose()
  @IsBoolean()
  @IsOptional()
  declare public readonly isEmailVerified?: boolean;
}

export class OauthValidateResult extends Dto<OauthValidateResult> {
  @Expose()
  @IsString()
  declare public readonly accessToken: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly refreshToken?: string;
  @Expose()
  @Nested(() => OauthProfile)
  declare public readonly profile: OauthProfile;
}
