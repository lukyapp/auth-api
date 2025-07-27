import { UserDto } from '@auth/domain';

export abstract class AuthStrategy<TBody> {
  abstract authenticate(body: TBody): Promise<UserDto>;
}
