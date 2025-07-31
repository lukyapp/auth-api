import { JwksPrimaryService } from '@auth/application';
import { Module } from '@nestjs/common';
import { JwksUseCasesModule } from './jwks-use-cases.module';
import { JwksController } from './jwks.controller';

@Module({
  imports: [JwksUseCasesModule],
  controllers: [JwksController],
  providers: [JwksPrimaryService],
})
export class JwksModule {}
