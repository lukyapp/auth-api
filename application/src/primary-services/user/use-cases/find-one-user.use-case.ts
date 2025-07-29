import { UserDto } from '@auth/domain';
import { injectable } from '../../../ioc/injectable.decorator';
import {
  GetOneUserBody,
  UserRepositoryPort,
} from '../../../secondary-ports/user/ports/user.repository.port';

@injectable()
export class FindOneUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(body: GetOneUserBody): Promise<UserDto | null> {
    return this.userRepository.getOneUser(body);
  }
}
