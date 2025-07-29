import { PasswordHasherPort, UserRepositoryPort } from '@auth/application';
import {
  PasswordHasherBcryptAdapter,
  UserRepositoryMemoryAdapter,
} from '@auth/infra';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryMemoryAdapter,
    },
    {
      provide: PasswordHasherPort,
      useClass: PasswordHasherBcryptAdapter,
    },
  ],
  exports: [PasswordHasherPort, UserRepositoryPort],
})
export class PortModule {}
