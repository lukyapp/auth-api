import { UserCreatorStrategy } from '../../../common/strategy/user-creator-strategy/user-creator.strategy.interface';
import { injectable } from '@auth/di';

@injectable()
export class CreateOneUserUseCase {
  constructor() {}

  async perform<TBody, TUserCreator extends UserCreatorStrategy<TBody>>(
    userCreator: TUserCreator,
    body: TBody,
  ) {
    return userCreator.create(body);
  }
}
