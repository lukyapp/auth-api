import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ResponseGetOne } from '../../common/response-get-one.dto';
import { Nested } from '../../validators/nested.validator';

export class AuthenticateUserResponseData extends Dto<AuthenticateUserResponseData> {
  @Expose()
  declare public readonly userId: string;

  @Expose()
  declare public readonly accessToken: string;

  @Expose()
  @IsOptional()
  declare public readonly refreshToken?: string;
}

export class AuthenticateUserResponse extends ResponseGetOne<AuthenticateUserResponseData> {
  @Expose()
  @Nested(() => AuthenticateUserResponseData)
  declare public readonly data: AuthenticateUserResponseData;
}
