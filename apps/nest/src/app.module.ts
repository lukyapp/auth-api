import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { ValidationModule } from './core/validation.module';
import { OauthModule } from './oauth/oauth.module';
import { PortModule } from './port.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PortModule,
    ValidationModule,
    ConfigurationModule,
    UserModule,
    OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
