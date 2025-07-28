import { AuthPrimaryService } from '@auth/application';
import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from './auth-use-cases.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthUseCasesModule],
  controllers: [AuthController],
  providers: [AuthPrimaryService],
})
export class AuthModule {}
