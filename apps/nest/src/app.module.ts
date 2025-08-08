import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/configuration.module';
import { Module } from './core/di/module.decorator';
import { ValidationModule } from './core/validation/validation.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { JwksModule } from './jwks/jwks.module';
import { OauthModule } from './oauth/oauth.module';
import { PortModule } from './port.module';
import { ServiceModule } from './service.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ExceptionsModule,
    // globals
    ValidationModule,
    ConfigurationModule,
    // services
    PortModule,
    ServiceModule,
    // modules
    AuthModule,
    UserModule,
    OauthModule,
    JwksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
