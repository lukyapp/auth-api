import { UserDto } from '@auth/domain';
import { injectable } from '@auth/di';
import { UserRepositoryPort } from '../../../secondary-ports/user/ports/user.repository.port';
import { UserCreatorStrategy } from './user-creator.strategy.interface';

type Body = {
  email: string;
};

@injectable()
export class OauthUserCreatorStrategy implements UserCreatorStrategy<Body> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  create({ email }: Body): Promise<UserDto> {
    return this.userRepository.createUser({
      email,
    });
  }
}
