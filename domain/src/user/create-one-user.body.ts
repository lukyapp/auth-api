import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateOneUserBody extends PickType(UserDto, [
  'email',
  'password',
]) {}
