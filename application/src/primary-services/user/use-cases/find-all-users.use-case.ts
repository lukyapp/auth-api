import { injectable } from '@auth/di';
import {
  Body,
  Nested,
  ResponseGetOne,
  UserDto,
  UserRepositoryPort,
} from '@auth/domain';
import { Expose, IsArray, IsNumber, IsPositive } from '@auth/validation';
import { GetOneUserBody } from './find-one-user.use-case';

export class GetAllUsersBody extends Body<GetAllUsersBody> {
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
