import { PasswordHasherPort } from '@auth/domain';
import { PasswordHasherBcryptAdapter } from '@auth/infra';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: PasswordHasherPort,
      useClass: PasswordHasherBcryptAdapter,
    },
  ],
  exports: [PasswordHasherPort],
})
export class PortModule {}
