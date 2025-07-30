import { applyDecorators } from '@nestjs/common';
import {
  ClassConstructor,
  plainToInstance,
  Transform,
} from 'class-transformer';
import { TypeHelpOptions } from 'class-transformer/types/interfaces';

export function Type(
  typeFunction: (type?: TypeHelpOptions) => ClassConstructor<any>,
) {
  return applyDecorators(
    Transform(({ value, key }) => {
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          return plainToInstance(typeFunction(), parsed, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
          });
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.error(`Failed to @Transform ${key} : `, e.message);
          }
        }
      }
      return plainToInstance(typeFunction(), value, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
    }),
  );
}
