import { PrivateKeyGetter } from '@auth/application';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [PrivateKeyGetter],
  exports: [PrivateKeyGetter],
})
export class MyJwtModule {}
