import { ExceptionsHandler } from '@auth/application';
import { Global } from '@nestjs/common';
import { Module } from '../core/di/module.decorator';
import { UnknownExceptionFilter } from './unknown-exception-filter';

@Global()
@Module({
  providers: [ExceptionsHandler, UnknownExceptionFilter],
  exports: [UnknownExceptionFilter],
})
export class ExceptionsModule {}
