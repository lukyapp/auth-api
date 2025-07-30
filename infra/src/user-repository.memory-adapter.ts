import {
  CreateUserBody,
  GetAllUsersBody,
  GetOneUserBody,
  UpdateUserBody,
  UserRepositoryPort,
} from '@auth/application';
import { UserDto } from '@auth/domain';
import { v4 as uuidv4 } from 'uuid';

export class UserRepositoryMemoryAdapter extends UserRepositoryPort {
  private users: UserDto[] = [];

  async getUserById(id: string): Promise<UserDto | null> {
    const user = this.users.find((u) => u.id === id) ?? null;
    return Promise.resolve(user);
  }

  async getUserByEmail(email: string): Promise<UserDto | null> {
    const user = this.users.find((u) => u.email === email) ?? null;
    return Promise.resolve(user);
  }

  async getOneUser(body: GetOneUserBody): Promise<UserDto | null> {
    const user =
      this.users.find((u) =>
        Object.entries(body).every(([key, val]) => (u as any)[key] === val),
      ) ?? null;
    return Promise.resolve(user);
  }

  async createUser(body: CreateUserBody): Promise<UserDto> {
    const newUser: UserDto = { id: uuidv4(), ...body };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  async updateUser(id: string, body: UpdateUserBody): Promise<UserDto | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return Promise.resolve(null);
    // @ts-expect-error lala
    this.users[index] = { ...this.users[index], ...body };
    return Promise.resolve(this.users[index] ?? null);
  }

  async deleteUser(id: string): Promise<boolean> {
    const originalLength = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return Promise.resolve(this.users.length < originalLength);
  }

  async getAllUsers(body: GetAllUsersBody): Promise<UserDto[]> {
    console.log('getAllUsers : ', body);
    return Promise.resolve([...this.users]);
  }
}
