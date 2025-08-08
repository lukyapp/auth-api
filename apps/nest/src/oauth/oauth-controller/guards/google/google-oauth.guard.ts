import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '../../../../core/di/injectable.decorator';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('GoogleOauthStrategy') {
  constructor() {
    super();
  }
}
