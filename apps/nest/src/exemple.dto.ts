import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class ExempleDto extends Dto<ExempleDto> {
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email: string;
}
