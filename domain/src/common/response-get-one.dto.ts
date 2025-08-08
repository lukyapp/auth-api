import { Expose } from '@auth/validation';
import { Dto } from '@auth/core';

export abstract class ResponseGetOne<TData> extends Dto<ResponseGetOne<TData>> {
  @Expose()
  abstract data: TData;

  constructor(data: TData) {
    super({ data });
  }
}
