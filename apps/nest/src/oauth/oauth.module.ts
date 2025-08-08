import { Utils } from '@auth/core';
import { ConfigurationServicePort } from '@auth/domain';
import { Module } from '../core/di/module.decorator';
import { GoogleOauthConfig } from './oauth-controller/guards/google/google-oauth.config';
import { GoogleOAuthGuard } from './oauth-controller/guards/google/google-oauth.guard';
import { GoogleOauthStrategy } from './oauth-controller/guards/google/google-oauth.strategy';
import { OauthConfigProxy } from './oauth-controller/guards/oauth-config.proxy';
import { OauthGuardProxy } from './oauth-controller/guards/oauth-guard.proxy';
import { OauthController } from './oauth-controller/oauth.controller';
import { OauthUseCasesModule } from './oauth-use-cases.module';

@Module({
  imports: [OauthUseCasesModule],
  controllers: [OauthController],
  providers: [
    // google
    {
      provide: GoogleOauthConfig,
      inject: [ConfigurationServicePort],
      useFactory: (configurationService: ConfigurationServicePort) => {
        return new GoogleOauthConfig({
          clientID: configurationService.get('oauth.google.clientId'),
          clientSecret: configurationService.get('oauth.google.clientSecret'),
          callbackURL: Utils.urlJoin(
            configurationService.get('server.baseUrl'),
            '/oauth/google/callback',
          ),
          successURL: Utils.urlJoin(
            configurationService.get('server.baseUrl'),
            '/oauth/google/success',
          ),
        });
      },
    },
    GoogleOauthStrategy,
    GoogleOAuthGuard,
    // proxy
    OauthGuardProxy,
    OauthConfigProxy,
  ],
})
export class OauthModule {}
