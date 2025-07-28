import { Dto } from '@auth/core';

export abstract class ResponseDto<T extends object> extends Dto<T> {}
