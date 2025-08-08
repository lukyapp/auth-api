import { applyDecorators } from '@auth/core';
import {
  ClassConstructor,
  plainToInstance,
  Transform,
} from 'class-transformer';

type TypeHelpOptions = {
  newObject: any;
  object: Record<string, any>;
  property: string;
};

export function TypeFromString(
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
