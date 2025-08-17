import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '../core/di/injectable.decorator';

@Injectable()
export class OauthHydraGuard extends AuthGuard('oauth2-hydra') {}
