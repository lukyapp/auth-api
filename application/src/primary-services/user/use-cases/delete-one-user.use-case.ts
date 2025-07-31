import { injectable } from '@auth/di';
import { UserRepositoryPort } from '@auth/domain';

@injectable()
export class DeleteOneUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  perform(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
