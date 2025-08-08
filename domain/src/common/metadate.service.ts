/* eslint-disable */

import { Type } from '@auth/core';

export function MetadataError<TError extends Error>(
  Error: Type<TError>,
): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata(
      '@auth/common:validation-error-to-throw',
      Error,
      target,
    );
  };
}

export class MetadateService {
  static getMetadataError(instance: { constructor: any }) {
    return this.getMetadataRecursive(
      '@auth/common:validation-error-to-throw',
      instance.constructor,
    );
  }

  private static getMetadataRecursive<TError extends Error>(
    key: '@auth/common:validation-error-to-throw',
    target: any,
  ): Type<TError>;
  private static getMetadataRecursive(key: string, target: any): any {
    while (target) {
      const meta = Reflect.getMetadata(key, target);
      if (meta) {
        return meta;
      }
      target = Object.getPrototypeOf(target);
    }
    return undefined;
  }
}
