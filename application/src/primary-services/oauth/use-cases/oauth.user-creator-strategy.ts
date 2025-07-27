import { UserDto } from '@auth/domain';
import { Injectable, Logger } from '@nestjs/common';
import { UserRepositoryPort } from '../../../secondary-ports/user/ports/user.repository.port';
import { UserCreatorStrategy } from '../../auth/use-cases/user-creator-strategy/user.creator.strategy';

type Body = {
  email: string;
};

@Injectable()
export class OauthUserCreatorStrategy implements UserCreatorStrategy<Body> {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly userRepository: UserRepositoryPort) {}

  create({ email }: Body): Promise<UserDto> {
    return this.userRepository.createUser({
      email,
    });
  }
}
