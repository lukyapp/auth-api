import { UserDto } from '@auth/domain';
import { injectable } from '@auth/di';
import { UserRepositoryPort } from '../../../secondary-ports/user/ports/user.repository.port';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { UserCreatorStrategy } from './user-creator.strategy.interface';

type Body = {
  email: string;
  password: string;
};

@injectable()
export class PasswordUserCreatorStrategy implements UserCreatorStrategy<Body> {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  create({ email, password }: Body): Promise<UserDto> {
    const passwordHashed = this.passwordHasher.hash(password);
    return this.userRepository.createUser({
      email,
      password: passwordHashed,
    });
  }
}
