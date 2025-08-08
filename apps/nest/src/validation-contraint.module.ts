import { Global } from '@nestjs/common';
import { Module } from './core/di/module.decorator';
import { IsGoodIssuerConstraint, IsInEnvArrayConstraint } from '@auth/domain';

@Global()
@Module({
  providers: [IsGoodIssuerConstraint, IsInEnvArrayConstraint],
  exports: [IsGoodIssuerConstraint, IsInEnvArrayConstraint],
})
export class ValidationContraintModule {}
