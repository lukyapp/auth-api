import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Dto } from '@auth/core';

export class UserDto extends Dto<UserDto> {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  declare public readonly id: string;

  @Expose()
  @ApiProperty({
    example: 'test@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  declare public readonly email: string;

  @ApiProperty({
    example: 'testtest',
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  declare public readonly password?: string;
}
