import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import {
  Nested,
  ResponseGetOne,
  UserDto,
  UserRepositoryPort,
} from '@auth/domain';
import { Expose } from 'class-transformer';
import { IsArray, IsNumber, IsPositive } from 'class-validator';
import { GetOneUserBody } from './find-one-user.use-case';

export class GetAllUsersBody extends Dto<GetAllUsersBody> {
  @IsNumber()
  @IsPositive()
  declare public readonly page: number;
  @IsNumber()
  @IsPositive()
  declare public readonly limit: number;
  @Nested(() => GetOneUserBody)
  declare public readonly data?: GetOneUserBody;
}

export class GetAllUsersResponse extends ResponseGetOne<UserDto[]> {
  @Expose()
  @IsArray()
  @Nested(() => UserDto, { each: true })
  declare public readonly data: UserDto[];
}

@injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(body: GetAllUsersBody) {
    const users = await this.userRepository.getAllUsers(body);
    return new GetAllUsersResponse(users);
  }
}
