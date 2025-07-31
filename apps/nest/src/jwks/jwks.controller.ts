import { JwksPrimaryService } from '@auth/application';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Get } from '../core/controller/http.decorator';

@ApiTags('Jwks')
@Controller()
export class JwksController {
  constructor(private readonly jwksPrimaryService: JwksPrimaryService) {}

  @Get('certs')
  getJwks() {
    return this.jwksPrimaryService.getJwks();
  }

  @Get('.well-known/openid-configuration')
  getOpenidConfiguration() {
    return this.jwksPrimaryService.getOpenidConfiguration();
  }
}
