import { UserPrimaryService } from '@auth/application';
import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './user-use-cases.module';
import { UserController } from './user.controller';

@Module({
  imports: [UserUseCasesModule],
  controllers: [UserController],
  providers: [UserPrimaryService],
})
export class UserModule {}
