import { Dto } from '@auth/core';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Request } from 'express';
import { Nested } from '../../validators/nested.validator';
import { ValidationService } from '../validation/validation.service';

export class OauthProfile extends Dto<OauthProfile> {
  @IsString()
  @IsOptional()
  declare public readonly id?: string;
  @IsString()
  @IsOptional()
  declare public readonly name?: string;
  @IsString()
  @IsOptional()
  declare public readonly email?: string;
  @IsBoolean()
  @IsOptional()
  declare public readonly isEmailVerified?: boolean;
}

export class OauthValidateResult extends Dto<OauthValidateResult> {
  @IsString()
  declare public readonly accessToken: string;
  @IsString()
  @IsOptional()
  declare public readonly refreshToken?: string;
  @Nested(() => OauthProfile)
  declare public readonly profile: OauthProfile;
}

export const CurrentOauthValidateResult = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return ValidationService.validate(OauthValidateResult, request.user);
  },
);
