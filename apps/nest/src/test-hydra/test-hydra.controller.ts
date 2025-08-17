import { Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Get } from '../core/controller/http.decorator';
import { Controller } from '../core/di/controller.decorator';
import { OauthHydraGuard } from './oauth-hydra.guard';

@ApiTags('test')
@Controller('test')
export class TestHydraController {
  constructor() {}

  @Get('authorize')
  @UseGuards(OauthHydraGuard)
  authorize() {}

  @Get('callback')
  @UseGuards(OauthHydraGuard)
  callback(@Req() request: Request) {
    const userAgent = request.headers['user-agent'];
    const isFromMobile = /mobile|android|iphone|ipad|ipod/i.test(
      userAgent ?? '',
    );
    console.log('isFromMobile', isFromMobile);
    console.log('request.user', request.user);
  }

  @Get('success')
  success() {}
}
