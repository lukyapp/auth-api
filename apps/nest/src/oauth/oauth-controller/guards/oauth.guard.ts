import { ValidationService } from '@auth/application';
import {
  OauthAuthorizeEndpointQuery,
  OauthEndpointParam,
} from '@auth/controller-dtos';
import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IAuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { OauthGuardProxy } from './oauth-guard.proxy';

@Injectable()
export class OauthGuard implements IAuthGuard {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly oauthGuardProxy: OauthGuardProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = this.getRequest(context);
    const guard = this.getOauthGuardFromRequest(request);

    if (request.url.split('?')[0]?.endsWith('callback')) {
      this.logger.log('callback endpoint triggered');
      return guard.canActivate(context);
    }
    this.logger.log('authorized endpoint triggered');
    const { success_callback } = ValidationService.validate(
      OauthAuthorizeEndpointQuery,
      request.query,
    );
    request.session.successCallback = success_callback;
    return guard.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  logIn<TRequest extends { logIn: Function } = any>(
    request: TRequest,
  ): Promise<void> {
    const guard = this.getOauthGuardFromRequest(request as unknown as Request);
    return guard.logIn(request);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const request: Request = this.getRequest(context);
    const guard = this.getOauthGuardFromRequest(request);
    return guard.handleRequest(err, user, info, context, status);
  }

  getAuthenticateOptions(
    context: ExecutionContext,
  ): IAuthModuleOptions | undefined {
    const request: Request = this.getRequest(context);
    const guard = this.getOauthGuardFromRequest(request);
    return guard.getAuthenticateOptions(context);
  }

  getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest();
  }

  private getOauthGuardFromRequest(request: Request) {
    const { oauthProviderName } = ValidationService.validate(
      OauthEndpointParam,
      request.params,
    );
    const guard = this.oauthGuardProxy.resolve(oauthProviderName);
    if (!guard) {
      throw new InternalServerErrorException();
    }
    return guard;
  }
}
