export abstract class PasswordHasherPort {
  abstract hash(password: string): string;

  abstract compare(password: string, hashedPassword?: string): boolean;
}
