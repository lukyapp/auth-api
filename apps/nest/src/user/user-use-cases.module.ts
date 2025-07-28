import {
  CreateOneUserUseCase,
  DeleteOneUserUseCase,
  FindAllUsersUseCase,
  FindOneUserUseCase,
  PasswordUserCreatorStrategy,
  UpdateOneUserUseCase,
} from '@auth/application';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    // services
    PasswordUserCreatorStrategy,
    // use-cases
    FindAllUsersUseCase,
    CreateOneUserUseCase,
    FindOneUserUseCase,
    UpdateOneUserUseCase,
    DeleteOneUserUseCase,
  ],
  exports: [
    // services
    PasswordUserCreatorStrategy,
    // use-cases
    FindAllUsersUseCase,
    CreateOneUserUseCase,
    FindOneUserUseCase,
    UpdateOneUserUseCase,
    DeleteOneUserUseCase,
  ],
})
export class UserUseCasesModule {}
