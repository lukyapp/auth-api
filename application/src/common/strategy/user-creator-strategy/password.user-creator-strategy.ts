import { UserDto, UserRepositoryPort, PasswordHasherPort } from '@auth/domain';
import { injectable } from '@auth/di';
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
