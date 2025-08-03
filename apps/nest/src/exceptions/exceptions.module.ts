import { Global, Module } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception-filter';
import { UnknownExceptionFilter } from './unknown-exception-filter';

@Global()
@Module({
  imports: [],
  providers: [HttpExceptionFilter, UnknownExceptionFilter],
  exports: [HttpExceptionFilter, UnknownExceptionFilter],
})
export class ExceptionsModule {}
