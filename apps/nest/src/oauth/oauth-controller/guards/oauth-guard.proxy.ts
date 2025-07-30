import { ObjectProxy } from '@auth/core';
import { Injectable } from '@nestjs/common';
import { GoogleOAuthGuard } from './google/google-oauth.guard';

@Injectable()
export class OauthGuardProxy extends ObjectProxy<{ google: GoogleOAuthGuard }> {
  constructor(googleOAuthGuard: GoogleOAuthGuard) {
    super({
      google: googleOAuthGuard,
    });
  }
}
