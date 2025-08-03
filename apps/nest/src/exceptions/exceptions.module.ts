import { ExceptionsHandler } from '@auth/application';
import { Global, Module } from '@nestjs/common';
import { UnknownExceptionFilter } from './unknown-exception-filter';

@Global()
@Module({
  imports: [],
  providers: [ExceptionsHandler, UnknownExceptionFilter],
  exports: [UnknownExceptionFilter],
})
export class ExceptionsModule {}
