import { OauthPrimaryService, OauthValidateResult } from '@auth/application';
import {
  OauthEndpointParam,
  OauthSuccessEndpointQuery,
} from '@auth/controller-dtos';
import {
  Controller,
  InternalServerErrorException,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CurrentOauthValidateResult } from '../../core/controller/current-oauth-validate-result.decorator';
import { Get } from '../../core/controller/http.decorator';
import { OauthConfigProxy } from './guards/oauth-config.proxy';
import { OauthGuard } from './guards/oauth.guard';

@ApiTags('oauth')
@Controller('oauth/:oauthProviderName')
export class OauthController {
  constructor(
    private readonly oauthPrimaryService: OauthPrimaryService,
    private readonly oauthConfigProxy: OauthConfigProxy,
  ) {}

  @Get('authorize')
  @UseGuards(OauthGuard)
  authorize() {}

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
    @Query()
    {
      userId,
      accessToken,
      refreshToken,
      refreshExpiresIn,
      expiresIn,
    }: OauthSuccessEndpointQuery,
  ) {
    return this.oauthPrimaryService.success({
      providerName: oauthProviderName,
      userId,
      accessToken,
      refreshToken,
      refreshExpiresIn,
      expiresIn,
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
