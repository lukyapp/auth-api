import { OauthValidateResult } from '@auth/application';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { OauthStrategyI } from '../common/oauth.strategy.interface';
import { GoogleOauthConfig } from './google-oauth.config';

@Injectable()
export class GoogleOauthStrategy
  extends PassportStrategy(Strategy, 'GoogleOauthStrategy')
  implements OauthStrategyI<Profile>
{
  constructor(oauthConfig: GoogleOauthConfig) {
    super({
      authorizationURL: oauthConfig.authorizationURL,
      tokenURL: oauthConfig.tokenURL,
      userProfileURL: oauthConfig.userInfoURL,
      clientID: oauthConfig.clientID,
      clientSecret: oauthConfig.clientSecret,
      callbackURL: oauthConfig.callbackURL,
      scope: oauthConfig.scope,
      state: true,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string | undefined,
    profile: Profile | undefined,
    done: (
      err: Error | undefined | null,
      user: OauthValidateResult | undefined,
      info?: object,
    ) => void,
  ): void {
    done(null, {
      accessToken,
      refreshToken,
      profile: {
        id: profile?._json.sub,
        email: profile?._json.email,
        isEmailVerified: profile?._json.email_verified,
        name: profile?._json.name,
      },
    });
  }
}
