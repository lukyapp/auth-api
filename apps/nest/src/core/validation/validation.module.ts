import {
  ClassSerializerInterceptor,
  Global,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationService } from './validation.service';

@Global()
@Module({
  controllers: [],
  imports: [],
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
        return new ValidationPipe(options);
      },
    },
  ],
  exports: [ClassSerializerInterceptor, ValidationPipe],
})
export class ValidationModule {}
