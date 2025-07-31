import { injectable } from '@auth/di';
import { PasswordHasherPort } from '@auth/domain';
import { compareSync, hashSync } from 'bcrypt';

@injectable()
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
