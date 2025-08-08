import { Dto } from '@auth/core';
import { Expose, IsString } from '@auth/validation';

export class UserDetailEndpointParam extends Dto<UserDetailEndpointParam> {
  @Expose()
  @IsString()
  declare public readonly userId: string;
}
