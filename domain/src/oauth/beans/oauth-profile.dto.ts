import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';

export class OauthProfile extends Dto<OauthProfile> {
  @Expose()
  declare public readonly id?: string;
  @Expose()
  declare public readonly name?: string;
  @Expose()
  declare public readonly email?: string;
  @Expose()
  declare public readonly isEmailVerified?: boolean;
}
