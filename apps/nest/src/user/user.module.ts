import { UserPrimaryService } from '@auth/application';
import { Module } from '../core/di/module.decorator';
import { UserUseCasesModule } from './user-use-cases.module';
import { UserController } from './user.controller';

@Module({
  imports: [UserUseCasesModule],
  controllers: [UserController],
  providers: [UserPrimaryService],
})
export class UserModule {}
