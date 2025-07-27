import { UserDto } from '@auth/domain';
import { Injectable } from '@nestjs/common';
import {
  UpdateUserBody,
  UserRepositoryPort,
} from '../../../secondary-ports/user/ports/user.repository.port';

@Injectable()
export class UpdateOneUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(id: string, body: UpdateUserBody): Promise<UserDto | null> {
    const isBodyEmpty = Object.entries(body).length === 0;
    if (isBodyEmpty) {
      return this.userRepository.getUserById(id);
    }
    return this.userRepository.updateUser(id, body);
  }
}
