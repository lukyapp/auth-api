import { Module } from '@nestjs/common';
import { OauthController } from './oauth-controller/oauth.controller';

@Module({
  imports: [],
  controllers: [OauthController],
  providers: [],
})
export class OauthModule {}
