import { AuthPrimaryService, SignInBody, SignUpBody } from '@auth/application';
import { Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '../core/di/controller.decorator';
import { Post } from '../core/controller/http.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authPrimaryService: AuthPrimaryService) {}

  @Post('sign-up')
  signUp(@Body() body: SignUpBody) {
    return this.authPrimaryService.signUp(body);
  }

  @Post('sign-in')
  signIn(@Body() body: SignInBody) {
    return this.authPrimaryService.signIn(body);
  }
}
