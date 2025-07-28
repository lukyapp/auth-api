import { Injectable } from '@nestjs/common';
import { PasswordUserCreatorStrategy } from '../../../common/strategy/user-creator-strategy/password.user-creator-strategy';
import { CreateOneUserUseCase } from '../../user/use-cases/create-one-user.use-case';

export type SignUpBody = {
  email: string;
  password: string;
};

@Injectable()
export class AuthSignUpUseCase {
  constructor(
    private readonly createOneUserUseCase: CreateOneUserUseCase,
    private readonly passwordUserCreatorStrategy: PasswordUserCreatorStrategy,
  ) {}

  async perform(body: SignUpBody) {
    return this.createOneUserUseCase.perform(
      this.passwordUserCreatorStrategy,
      body,
    );
  }
}
