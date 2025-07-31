import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { PasswordUserCreatorStrategy } from '../../../common/strategy/user-creator-strategy/password.user-creator-strategy';
import { injectable } from '@auth/di';
import { CreateOneUserUseCase } from '../../user/use-cases/create-one-user.use-case';
import { AuthSignInUseCase } from './auth-sign-in.use-case';

export class SignUpBody extends Dto<SignUpBody> {
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email: string;
  @Expose()
  @IsString()
  declare public readonly password: string;
}

@injectable()
export class AuthSignUpUseCase {
  constructor(
    private readonly createOneUserUseCase: CreateOneUserUseCase,
    private readonly passwordUserCreatorStrategy: PasswordUserCreatorStrategy,
    private readonly authSignInUseCase: AuthSignInUseCase,
  ) {}

  async perform(body: SignUpBody) {
    const user = await this.createOneUserUseCase.perform(
      this.passwordUserCreatorStrategy,
      body,
    );
    return this.authSignInUseCase.perform({
      email: user.email,
      password: body.password,
    });
  }
}
