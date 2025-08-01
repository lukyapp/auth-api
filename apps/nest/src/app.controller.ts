import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ApiBearerAuth } from './core/controller/api-bearer-auth.decorator';
import {
  CurrentUser,
  CurrentUserDto,
} from './core/controller/current-user.decorator';

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
  getHelloProtected(@CurrentUser() currentUser: CurrentUserDto): string {
    console.log(currentUser);
    return this.appService.getHello(currentUser);
  }
}
