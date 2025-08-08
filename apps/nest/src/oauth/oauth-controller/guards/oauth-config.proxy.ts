import { ObjectProxy } from '@auth/core';
import { Injectable } from '../../../core/di/injectable.decorator';

import { GoogleOauthConfig } from './google/google-oauth.config';

@Injectable()
export class OauthConfigProxy extends ObjectProxy<{
  google: GoogleOauthConfig;
}> {
  constructor(googleOauthConfig: GoogleOauthConfig) {
    super({
      google: googleOauthConfig,
    });
  }
}
