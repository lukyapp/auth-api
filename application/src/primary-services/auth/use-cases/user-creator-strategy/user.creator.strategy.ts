import { UserDto } from '@auth/domain';

export abstract class UserCreatorStrategy<TBody> {
  abstract create(body: TBody): Promise<UserDto>;
}
