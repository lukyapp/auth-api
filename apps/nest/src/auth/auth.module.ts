import { AuthPrimaryService } from '@auth/application';
import { Module } from '../core/di/module.decorator';
import { AuthUseCasesModule } from './auth-use-cases.module';
import { AuthController } from './auth.controller';
import { JwtAuthLocalGuard } from './guards/jwt-auth-local.guard';
import { JwtAuthLocalStrategy } from './guards/jwt-auth-local.strategy';
import { JwtAuthOpenIdGuard } from './guards/jwt-auth-open-id.guard';
import { JwtAuthOpenIdStrategy } from './guards/jwt-auth-open-id.strategy';

@Module({
  imports: [AuthUseCasesModule],
  controllers: [AuthController],
  providers: [
    JwtAuthOpenIdGuard,
    JwtAuthOpenIdStrategy,
    JwtAuthLocalGuard,
    JwtAuthLocalStrategy,
    AuthPrimaryService,
  ],
})
export class AuthModule {}
