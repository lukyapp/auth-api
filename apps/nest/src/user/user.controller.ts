import {
  GetAllUsersBody,
  GetOneUserBody,
  UpdateUserBody,
  UserPrimaryService,
} from '@auth/application';
import { CreateOneUserBody } from '@auth/domain';
import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Delete, Get, Patch, Post } from '../core/controller/http.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userPrimaryService: UserPrimaryService) {}

  @Get()
  findAll(@Query() body: GetAllUsersBody) {
    return this.userPrimaryService.findAll(body);
  }

  @Post()
  createOne(@Body() body: CreateOneUserBody) {
    return this.userPrimaryService.createOne(body);
  }

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.userPrimaryService.findOne({ id });
  }

  @Patch(':userId')
  updateOne(@Param('userId') id: string, @Body() body: UpdateUserBody) {
    return this.userPrimaryService.updateOne(id, body);
  }

  @Delete(':userId')
  deleteOne(@Param('userId') id: string) {
    return this.userPrimaryService.deleteOne(id);
  }
}
