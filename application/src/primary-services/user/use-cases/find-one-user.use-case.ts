import { UserDto } from '@auth/domain';
import { Injectable } from '@nestjs/common';
import {
  GetOneUserBody,
  UserRepositoryPort,
} from '../../../secondary-ports/user/ports/user.repository.port';

@Injectable()
export class FindOneUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(body: GetOneUserBody): Promise<UserDto | null> {
    return this.userRepository.getOneUser(body);
  }

  async performById(id: string): Promise<UserDto | null> {
    return this.userRepository.getUserById(id);
  }
}
