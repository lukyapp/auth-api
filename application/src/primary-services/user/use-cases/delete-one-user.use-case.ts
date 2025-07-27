import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../../secondary-ports/user/ports/user.repository.port';

@Injectable()
export class DeleteOneUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(id: string): Promise<boolean> {
    return this.userRepository.deleteUser(id);
  }
}
