import { UserDto } from '@auth/domain';
import { Injectable } from '@nestjs/common';
import { UserCreatorStrategy } from '../../../common/strategy/user-creator-strategy/user-creator.strategy.interface';

@Injectable()
export class CreateOneUserUseCase {
  constructor() {}

  async perform<TBody, TUserCreator extends UserCreatorStrategy<TBody>>(
    userCreator: TUserCreator,
    body: TBody,
  ): Promise<UserDto> {
    return userCreator.create(body);
  }
}
