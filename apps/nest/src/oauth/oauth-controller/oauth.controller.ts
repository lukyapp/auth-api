import { OauthPrimaryService } from '@auth/application';
import { AuthenticateUserResponse } from '@auth/domain';
import {
  Controller,
  InternalServerErrorException,
  Logger,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  CurrentOauthValidateResult,
  OauthValidateResult,
} from '../../core/controller/current-oauth-validate-result.decorator';
import { Get } from '../../core/controller/http.decorator';
import { OauthConfigProxy } from './guards/oauth-config.proxy';
import { OauthGuard } from './guards/oauth.guard';
import { OauthEndpointParam } from './beans/oauth-endpoint.param';
import { OauthSuccessEndpointQuery } from './beans/oauth-success-endpoint.query';

@ApiTags('oauth')
@Controller('oauth/:oauthProviderName')
export class OauthController {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly oauthPrimaryService: OauthPrimaryService,
    private readonly oauthConfigProxy: OauthConfigProxy,
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
    @CurrentOauthValidateResult() validateResult: OauthValidateResult,
    @Param() { oauthProviderName }: OauthEndpointParam,
  ): Promise<void> {
    const userAgent = request.headers['user-agent'];
    const isFromMobile = /mobile|android|iphone|ipad|ipod/i.test(
      userAgent ?? '',
    );
    const successUrl = this.getSuccessUrl(request, { oauthProviderName });
    this.logger.log('successUrl : ', successUrl);

    const callbackUrl = await this.oauthPrimaryService.callback({
      validateResult,
      isFromMobile,
      successUrl,
      providerName: oauthProviderName,
    });

    response.redirect(callbackUrl);
  }

  @Get('success')
  success(
    @Param() { oauthProviderName }: OauthEndpointParam,
    @Query() { userId, accessToken, refreshToken }: OauthSuccessEndpointQuery,
  ): Promise<AuthenticateUserResponse> {
    return this.oauthPrimaryService.success({
      providerName: oauthProviderName,
      userId,
      accessToken,
      refreshToken,
    });
  }

  private getSuccessUrl(
    request: Request,
    { oauthProviderName }: OauthEndpointParam,
  ) {
    const successCallback = request.session.successCallback;
    if (successCallback) {
      return new URL(successCallback);
    } else {
      const config = this.oauthConfigProxy.resolve(oauthProviderName);
      if (!config) {
        throw new InternalServerErrorException();
      }
      return new URL(config.successURL);
    }
  }
}
