import { Dto } from './dto';

export abstract class ResponseDto<T extends object> extends Dto<T> {}
