import { CreateOneUserBody, UserDto } from '@auth/domain';
import { Body, Controller } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { Post } from '../core/http.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor() {}

  @Post()
  @ApiBadRequestResponse({ description: 'Bad request' })
  async createOneUser(@Body() body: CreateOneUserBody) {
    const user = new UserDto({
      id: '1',
      email: body.email,
      password: body.password,
    });
    return user;
  }
}
