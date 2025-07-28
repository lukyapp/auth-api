import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserBody extends Dto<UpdateUserBody> {
  @Expose()
  @IsEmail()
  @IsString()
  @IsOptional()
  declare public readonly email?: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly password?: string;
}
