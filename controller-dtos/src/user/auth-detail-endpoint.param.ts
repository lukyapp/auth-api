import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthDetailEndpointParam extends Dto<AuthDetailEndpointParam> {
  @Expose()
  @IsString()
  declare public readonly userId: string;
}
