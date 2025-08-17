import { Module } from '../core/di/module.decorator';
import { OauthHydraGuard } from './oauth-hydra.guard';
import { OauthHydraStrategy } from './oauth-hydra.strategy';
import { TestHydraController } from './test-hydra.controller';

@Module({
  imports: [],
  controllers: [TestHydraController],
  providers: [OauthHydraGuard, OauthHydraStrategy],
})
export class TestHydraModule {}
