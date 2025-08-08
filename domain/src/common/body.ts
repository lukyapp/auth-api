import { Dto } from '@auth/core';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { MetadataError } from './metadate.service';

@MetadataError(BadRequestException)
export abstract class Body<
  T extends object,
  TOmitKey extends keyof T = never,
> extends Dto<T, TOmitKey> {
  static isBody<TInstance extends object>(instance: TInstance) {
    return this.getMetadataRecursive(
      '@auth/common:body-metadata',
      instance.constructor,
    );
  }

  static getMetadataRecursive(key: string, target: any) {
    while (target) {
      const meta = Reflect.getMetadata(key, target);
      if (meta) {
        return !!meta;
      }
      target = Object.getPrototypeOf(target);
    }
    return false;
  }
}
