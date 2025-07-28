import { PasswordHasherPort, UserRepositoryPort } from '@auth/application';
import { PasswordHasherBcryptAdapter } from '@auth/infra';
import { UserRepositoryMemoryAdapter } from '@auth/infra/dist/user-repository.memory-adapter';
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
