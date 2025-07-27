import { PasswordHasherPort } from '@auth/application';
import { Injectable } from '@nestjs/common';
import { hashSync, compareSync } from 'bcrypt';

@Injectable()
export class PasswordHasherBcryptAdapter implements PasswordHasherPort {
  private readonly SALT_ROUNDS = 10;

  hash(password: string): string {
    return hashSync(password, this.SALT_ROUNDS);
  }

  compare(password: string, hashedPassword?: string): boolean {
    if (!hashedPassword) {
      return false;
    }
    return compareSync(password, hashedPassword);
  }
}
