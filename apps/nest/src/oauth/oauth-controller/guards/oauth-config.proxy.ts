import { Injectable } from '@nestjs/common';
import { ObjectProxy } from '../../../core/object.proxy.interface';
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
