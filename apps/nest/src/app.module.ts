import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/configuration.module';
import { ValidationModule } from './core/validation/validation.module';
import { MyJwtModule } from './jwt/my-jwt.module';
import { OauthModule } from './oauth/oauth.module';
import { PortModule } from './port.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // globals
    MyJwtModule,
    ValidationModule,
    ConfigurationModule,
    // services
    PortModule,
    // modules
    AuthModule,
    UserModule,
    OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
