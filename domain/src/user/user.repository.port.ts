import { Body } from '../common/body';
import { UserDto } from './user.dto';

export class CreateUserBody extends Body<CreateUserBody> {
  declare public readonly email: string;
  declare public readonly password?: string;
}

export class UpdateUserBody extends Body<UpdateUserBody> {
  declare public readonly email?: string;
  declare public readonly password?: string;
}

export class GetOneUserBody extends Body<CreateUserBody> {
  declare public readonly id?: string | string[];
  declare public readonly email?: string | string[];
}

export class GetAllUsersBody extends Body<GetAllUsersBody> {
  declare public readonly page: number;
  declare public readonly limit: number;
  declare public readonly data?: GetOneUserBody;
}

export abstract class UserRepositoryPort {
  abstract getUserById(id: string): Promise<UserDto | null>;

  abstract getUserByEmail(email: string): Promise<UserDto | null>;

  abstract getOneUser(body: GetOneUserBody): Promise<UserDto | null>;

  abstract createUser(body: CreateUserBody): Promise<UserDto>;

  abstract updateUser(
    id: string,
    body: UpdateUserBody,
  ): Promise<UserDto | null>;

  abstract deleteUser(id: string): Promise<boolean>;

  abstract getAllUsers(body: GetAllUsersBody): Promise<UserDto[]>;
}
