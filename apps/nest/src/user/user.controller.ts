import { CreateOneUserBody, UserDto } from '@auth/domain';
import { Body, Controller } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post } from '../core/http.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    type: UserDto,
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    type: UserDto,
    status: 400,
    description: 'Bad request',
  })
  async createOneUser(@Body() body: CreateOneUserBody): Promise<UserDto> {
    const user = new UserDto({
      id: '1',
      email: body.email,
      password: body.password,
    });
    return user;
  }
}
