import { ValidationService } from '@auth/application';
import {
  ClassSerializerInterceptor,
  Global,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationContraintModule } from '../../validation-contraint.module';
import { Module } from '../di/module.decorator';

@Global()
@Module({
  imports: [ValidationContraintModule],
  providers: [
    {
      provide: ClassSerializerInterceptor,
      inject: [Reflector],
      useFactory: (reflector: Reflector) => {
        const options =
          ValidationService.getClassSerializerInterceptorOptions();
        return new ClassSerializerInterceptor(reflector, options);
      },
    },
    {
      provide: ValidationPipe,
      useFactory: () => {
        const options = ValidationService.getValidationPipeOptions();
        // @ts-expect-error lala
        return new ValidationPipe(options);
      },
    },
  ],
  exports: [
    ClassSerializerInterceptor,
    ValidationPipe,
    ValidationContraintModule,
  ],
})
export class ValidationModule {}
