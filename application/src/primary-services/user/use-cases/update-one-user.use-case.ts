import { Dto } from '@auth/core';
import { UserRepositoryPort } from '@auth/domain';
import { injectable } from '@auth/di';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { GetOneUserBodyResponse } from './find-one-user.use-case';

export class UpdateUserBody extends Dto<UpdateUserBody> {
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email?: string;
  @Expose()
  @IsString()
  declare public readonly password?: string;
}

@injectable()
export class UpdateOneUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(id: string, body: UpdateUserBody) {
    const isBodyEmpty = Object.entries(body).length === 0;
    if (isBodyEmpty) {
      const user = await this.userRepository.getUserById(id);
      return new GetOneUserBodyResponse(user);
    }
    const user = await this.userRepository.updateUser(id, body);
    return new GetOneUserBodyResponse(user);
  }
}
