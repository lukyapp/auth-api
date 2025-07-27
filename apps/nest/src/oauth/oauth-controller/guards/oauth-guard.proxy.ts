import { Injectable } from '@nestjs/common';
import { ObjectProxy } from '../../../core/object.proxy.interface';
import { GoogleOAuthGuard } from './google/google-oauth.guard';

@Injectable()
export class OauthGuardProxy extends ObjectProxy<{ google: GoogleOAuthGuard }> {
  constructor(googleOAuthGuard: GoogleOAuthGuard) {
    super({
      google: googleOAuthGuard,
    });
  }
}
