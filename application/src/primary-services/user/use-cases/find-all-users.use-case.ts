import { UserDto } from '@auth/domain';
import { Injectable } from '@nestjs/common';
import {
  GetAllUsersBody,
  UserRepositoryPort,
} from '../../../secondary-ports/user/ports/user.repository.port';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(body: GetAllUsersBody): Promise<UserDto[]> {
    return this.userRepository.getAllUsers(body);
  }
}
