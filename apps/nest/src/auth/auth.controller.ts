import { AuthPrimaryService } from '@auth/application';
import { SignInBody, SignUpBody } from '@auth/controller-dtos';
import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
