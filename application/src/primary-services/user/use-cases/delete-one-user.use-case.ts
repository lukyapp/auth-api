import { injectable } from '@auth/di';
import { UserRepositoryPort } from '../../../secondary-ports/user/ports/user.repository.port';

@injectable()
export class DeleteOneUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(id: string): Promise<boolean> {
    return this.userRepository.deleteUser(id);
  }
}
