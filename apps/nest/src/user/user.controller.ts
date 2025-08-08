import {
  GetAllUsersBody,
  UpdateUserBody,
  UserPrimaryService,
} from '@auth/application';
import { UserDetailEndpointParam } from '@auth/controller-dtos';
import { Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '../core/di/controller.decorator';
import { Delete, Get, Patch } from '../core/controller/http.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userPrimaryService: UserPrimaryService) {}

  @Get()
  findAll(@Query() body: GetAllUsersBody) {
    return this.userPrimaryService.findAll(body);
  }

  @Get(':userId')
  findOne(@Param() { userId }: UserDetailEndpointParam) {
    return this.userPrimaryService.findOne({ id: userId });
  }

  @Patch(':userId')
  updateOne(
    @Param() { userId }: UserDetailEndpointParam,
    @Body() body: UpdateUserBody,
  ) {
    return this.userPrimaryService.updateOne(userId, body);
  }

  @Delete(':userId')
  deleteOne(@Param() { userId }: UserDetailEndpointParam) {
    return this.userPrimaryService.deleteOne(userId);
  }
}
