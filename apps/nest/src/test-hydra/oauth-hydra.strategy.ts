import { Utils } from '@auth/core';
import { ConfigurationServicePort, UnauthorizedException } from '@auth/domain';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class OauthHydraStrategy extends PassportStrategy(
  Strategy,
  'oauth2-hydra',
) {
  private options: {
    authorizationURL: string;
    tokenURL: string;
    userInfoURL: string;
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
  };
  constructor(configurationService: ConfigurationServicePort) {
    const serverBaseUrl = configurationService.get('server.baseUrl');
    const hydraBaseUrl = configurationService.get('hydra.baseUrl');
    const options = {
      authorizationURL: Utils.urlJoin(hydraBaseUrl, '/oauth2/auth'),
      tokenURL: Utils.urlJoin(hydraBaseUrl, '/oauth2/token'),
      userInfoURL: Utils.urlJoin(hydraBaseUrl, '/userinfo'),
      clientID: configurationService.get('hydra.oauth.clientId'),
      clientSecret: configurationService.get('hydra.oauth.clientSecret'),
      callbackURL: Utils.urlJoin(serverBaseUrl, '/test/callback'),
      scope: 'openid offline email profile'.split(/\s+/),
    } as const;
    super({
      ...options,
      state: true,
    });
    this.options = options;
  }

  // (Optional) If you want to push extra params into the auth request (e.g., prompt, audience)
  authorizationParams(): any {
    return {
      // prompt: 'consent',
      // audience: 'api://your-audience',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    ...args: any[]
  ) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    console.log('args', args);

    // If your provider exposes a userinfo/profile endpoint, call it here:
    let userinfo = profile;
    if (!userinfo || !userinfo.id) {
      const res = await axios.get(this.options.userInfoURL, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('res.data', res.data);
      userinfo = res.data;
    }

    if (!userinfo) {
      throw new UnauthorizedException('No profile returned by provider');
    }

    console.log({
      id: userinfo.sub ?? userinfo.id,
      email: userinfo.email,
      name:
        userinfo.name ??
        `${userinfo.given_name ?? ''} ${userinfo.family_name ?? ''}`.trim(),
      accessToken,
      refreshToken,
    });

    // Find-or-create your app user here and return it
    // The returned value becomes req.user
    return {
      id: userinfo.sub ?? userinfo.id,
      email: userinfo.email,
      name:
        userinfo.name ??
        `${userinfo.given_name ?? ''} ${userinfo.family_name ?? ''}`.trim(),
      accessToken,
      refreshToken,
    };
  }
}
