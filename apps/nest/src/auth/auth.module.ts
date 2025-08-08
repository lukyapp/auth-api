import { AuthPrimaryService } from '@auth/application';
import { Module } from '../core/di/module.decorator';
import { AuthUseCasesModule } from './auth-use-cases.module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthStrategy } from './guards/jwt-auth.strategy';

@Module({
  imports: [AuthUseCasesModule],
  controllers: [AuthController],
  providers: [JwtAuthGuard, JwtAuthStrategy, AuthPrimaryService],
})
export class AuthModule {}
