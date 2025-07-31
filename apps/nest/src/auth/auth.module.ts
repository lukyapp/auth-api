import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from './auth-use-cases.module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthStrategy } from './guards/jwt-auth.strategy';
import { AuthPrimaryService } from '@auth/application';

@Module({
  imports: [AuthUseCasesModule],
  controllers: [AuthController],
  providers: [JwtAuthGuard, JwtAuthStrategy, AuthPrimaryService],
})
export class AuthModule {}
