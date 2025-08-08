import { Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from './core/controller/api-bearer-auth.decorator';
import { Controller } from './core/di/controller.decorator';
import {
  CurrentUser,
  CurrentUserDto,
} from './core/controller/current-user.decorator';
import { Get, Post } from './core/controller/http.decorator';
import { ExempleDto } from './exemple.dto';

@ApiTags('Hello')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('unprotected')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  @ApiBearerAuth(JwtAuthGuard)
  getHelloProtected(@CurrentUser() currentUser: CurrentUserDto): string {
    return this.appService.getHello(currentUser);
  }

  @ApiBearerAuth()
  @Get('exemple/user')
  exempleUser(): string {
    return 'email';
  }

  @ApiBearerAuth()
  @Post('exemple/login')
  exempleLogin(@Body() { email }: ExempleDto): string {
    return email;
  }

  @ApiBearerAuth()
  @Post('exemple/login2')
  exempleLogin2(@Body() { email }: ExempleDto): string {
    return email;
  }
}
