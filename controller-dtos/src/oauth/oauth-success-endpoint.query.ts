import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class OauthSuccessEndpointQuery extends Dto<OauthSuccessEndpointQuery> {
  @Expose()
  @IsString()
  @IsUUID(4)
  declare public readonly userId: string;
  @Expose()
  @IsString()
  declare public readonly accessToken: string;
  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly expiresIn: number;

  @Expose()
  @IsString()
  declare public readonly refreshToken: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly refreshExpiresIn: number;
}
