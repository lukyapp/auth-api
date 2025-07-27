import { Expose } from 'class-transformer';
import { Dto } from '@auth/core';

export abstract class ResponseGetOne<TData extends object> extends Dto<
  ResponseGetOne<TData>
> {
  @Expose()
  abstract data: TData;

  constructor(data: TData) {
    super({ data });
  }
}
