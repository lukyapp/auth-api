import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SignUpBody {
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email: string;
  @Expose()
  @IsString()
  declare public readonly password: string;
}
