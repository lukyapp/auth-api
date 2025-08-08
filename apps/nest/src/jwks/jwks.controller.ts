import { JwksPrimaryService } from '@auth/application';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '../core/di/controller.decorator';
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
