import { UserDto } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { injectable } from '../../../ioc/injectable.decorator';
import { UserRepositoryPort } from '../../../secondary-ports/user/ports/user.repository.port';
import { UserCreatorStrategy } from './user-creator.strategy.interface';

type Body = {
  email: string;
};

@injectable()
export class OauthUserCreatorStrategy implements UserCreatorStrategy<Body> {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly userRepository: UserRepositoryPort) {}

  create({ email }: Body): Promise<UserDto> {
    return this.userRepository.createUser({
      email,
    });
  }
}
