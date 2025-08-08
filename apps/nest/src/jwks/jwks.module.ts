import { JwksPrimaryService } from '@auth/application';
import { Module } from '../core/di/module.decorator';
import { JwksUseCasesModule } from './jwks-use-cases.module';
import { JwksController } from './jwks.controller';

@Module({
  imports: [JwksUseCasesModule],
  controllers: [JwksController],
  providers: [JwksPrimaryService],
})
export class JwksModule {}
