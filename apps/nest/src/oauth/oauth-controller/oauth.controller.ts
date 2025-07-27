import { OauthPrimaryService } from 'application/src/primary-services/oauth/oauth.primary-service';
import {
  AuthenticateUserResponse,
  ConfigurationServicePort,
  OauthValidateResult,
} from '@auth/domain';
import {
  Controller,
  Logger,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CurrentUser } from '../../core/current-user.decorator';
import { Get } from '../../core/http.decorator';
import { Utils } from '../../core/utils/utils';
import { OauthGuard } from './guards/oauth.guard';
import { OauthEndpointParam } from './oauth-endpoint.param';

@ApiTags('oauth')
@Controller('auth/:oauthProviderName')
export class OauthController {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly oauthPrimaryService: OauthPrimaryService,
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  @Get('authorize')
  @UseGuards(OauthGuard)
  authorize(
    @Param() { oauthProviderName }: OauthEndpointParam,
  ): void | Promise<void> {
    return this.oauthPrimaryService.authorize({ oauthProviderName });
  }

  @Get('callback')
  @UseGuards(OauthGuard)
  async callback(
    @Req() request: Request,
    @Res() response: Response,
    @CurrentUser() validateResult: OauthValidateResult,
    @Param() { oauthProviderName }: OauthEndpointParam,
  ): Promise<void> {
    const userAgent = request.headers['user-agent'];
    const isFromMobile = /mobile|android|iphone|ipad|ipod/i.test(
      userAgent ?? '',
    );
    const successUrl = this.getSuccessUrl(request, { oauthProviderName });

    const callbackUrl = await this.oauthPrimaryService.getCallbackUrl({
      validateResult,
      isFromMobile,
      successUrl,
      providerName: oauthProviderName,
    });

    response.redirect(callbackUrl);
  }

  private getSuccessUrl(
    request: Request,
    { oauthProviderName }: OauthEndpointParam,
  ) {
    const successCallback = request.session.successCallback;
    if (successCallback) {
      return new URL(successCallback);
    } else {
      const baseUrl = this.configurationService.get('server.baseUrl');
      const successWebCallback = Utils.urlJoin(
        baseUrl,
        `/auth/${oauthProviderName}/success`,
      );
      return new URL(successWebCallback);
    }
  }

  @Get('success')
  success(
    @Param() { oauthProviderName }: OauthEndpointParam,
    @Query('userId') userId: string,
    @Query('accessToken') accessToken: string,
    @Query('refreshToken') refreshToken: string,
  ): AuthenticateUserResponse {
    return this.oauthPrimaryService.success({
      providerName: oauthProviderName,
      userId,
      accessToken,
      refreshToken,
    });
  }
}
