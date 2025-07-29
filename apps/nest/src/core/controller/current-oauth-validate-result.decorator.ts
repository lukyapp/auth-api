import { ValidationService } from '@auth/application';
import { OauthValidateResult } from '@auth/controller-dtos';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentOauthValidateResult = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    console.log(request.user);
    return ValidationService.validate(OauthValidateResult, request.user);
  },
);
