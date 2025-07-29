import { UserDto } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { injectable } from '../../../ioc/injectable.decorator';
import { UserRepositoryPort } from '../../../secondary-ports/user/ports/user.repository.port';
import { PasswordHasherPort } from '../../ports/password-hasher.port';
import { UserCreatorStrategy } from './user-creator.strategy.interface';

type Body = {
  email: string;
  password: string;
};

@injectable()
export class PasswordUserCreatorStrategy implements UserCreatorStrategy<Body> {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly passwordHasherPort: PasswordHasherPort,
  ) {}

  create({ email, password }: Body): Promise<UserDto> {
    const passwordHashed = this.passwordHasherPort.hash(password);
    return this.userRepository.createUser({
      email,
      password: passwordHashed,
    });
  }
}
