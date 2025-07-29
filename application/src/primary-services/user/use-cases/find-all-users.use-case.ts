import { UserDto } from '@auth/domain';
import { injectable } from '../../../ioc/injectable.decorator';
import {
  GetAllUsersBody,
  UserRepositoryPort,
} from '../../../secondary-ports/user/ports/user.repository.port';

@injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(body: GetAllUsersBody): Promise<UserDto[]> {
    return this.userRepository.getAllUsers(body);
  }
}
