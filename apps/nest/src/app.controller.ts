import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ApiBearerAuth } from './core/controller/api-bearer-auth.decorator';

@ApiTags('Hello')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('unprotected')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  @ApiBearerAuth()
  getHelloProtected(): string {
    return this.appService.getHello();
  }
}
