import { Dto } from '@auth/core';
import { Expose } from '@auth/validation';

export abstract class ResponseGetOne<TData extends object> extends Dto<
  ResponseGetOne<TData>
> {
  @Expose()
  abstract data: TData;

  constructor(data: TData) {
    super({ data });
  }
}
