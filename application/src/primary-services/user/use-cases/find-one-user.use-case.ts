import { injectable } from '@auth/di';
import {
  Body,
  Nested,
  ResponseGetOne,
  UserDto,
  UserRepositoryPort,
} from '@auth/domain';
import { Expose, IsEmail, IsOptional, IsString } from '@auth/validation';

export class GetOneUserBody extends Body<GetOneUserBody> {
  @Expose()
  @IsString()
  declare public readonly id?: string | string[];
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email?: string | string[];
}

export class GetOneUserBodyResponse extends ResponseGetOne<UserDto | null> {
  @Expose()
  @IsOptional()
  @Nested(() => UserDto)
  declare public readonly data: UserDto | null;
}

@injectable()
export class FindOneUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async perform(body: GetOneUserBody) {
    const user = await this.userRepository.getOneUser(body);
    return new GetOneUserBodyResponse(user);
  }
}
