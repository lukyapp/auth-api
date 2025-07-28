import { UserPrimaryService } from '@auth/application';
import {
  AuthDetailEndpointParam,
  GetAllUsersQuery,
  UpdateUserBody,
} from '@auth/controller-dtos';
import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Delete, Get, Patch } from '../core/controller/http.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userPrimaryService: UserPrimaryService) {}

  @Get()
  findAll(@Query() body: GetAllUsersQuery) {
    return this.userPrimaryService.findAll(body);
  }

  @Get(':userId')
  findOne(@Param() { userId }: AuthDetailEndpointParam) {
    return this.userPrimaryService.findOne({ id: userId });
  }

  @Patch(':userId')
  updateOne(
    @Param() { userId }: AuthDetailEndpointParam,
    @Body() body: UpdateUserBody,
  ) {
    return this.userPrimaryService.updateOne(userId, body);
  }

  @Delete(':userId')
  deleteOne(@Param() { userId }: AuthDetailEndpointParam) {
    return this.userPrimaryService.deleteOne(userId);
  }
}
