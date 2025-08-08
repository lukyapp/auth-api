import { Dto } from '@auth/core';
import { Expose, IsEmail, IsString } from '@auth/validation';

export class ExempleDto extends Dto<ExempleDto> {
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email: string;
}
