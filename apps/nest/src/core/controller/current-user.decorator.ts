import { Dto } from '@auth/core';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsArray, IsEmail, IsString, IsUUID } from 'class-validator';
import { Request } from 'express';
import { ValidationService } from '@auth/application';

export class CurrentUserDto extends Dto<CurrentUserDto> {
  @Expose()
  @IsString()
  @IsUUID(4)
  declare public readonly userId: string;
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email: string;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  declare public readonly roles: string[];
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return ValidationService.validate(CurrentUserDto, request.user);
  },
);
