import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserDetailEndpointParam extends Dto<UserDetailEndpointParam> {
  @Expose()
  @IsString()
  declare public readonly userId: string;
}
