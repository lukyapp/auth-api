import {
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@auth/domain';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '../../core/di/injectable.decorator';

type Err = Error | null;
type User<TUser> = TUser | false;
type Challenge = Error | string | unknown;
type Info = Challenge | Challenge[];
type _Status = number | unknown;
type Status = _Status | _Status[];

@Injectable()
export class JwtAuthOpenIdGuard extends AuthGuard('jwt-open-id') {
  handleRequest<TUser extends object>(
    err: Err,
    user: User<TUser>,
    info: Info,
    _context: ExecutionContextHost,
    status: Status,
  ) {
    const challenges = Array.isArray(info) ? info : [info];
    const statuses = Array.isArray(status) ? status : [status];

    console.log('user', user);
    console.log('challenges', challenges);
    console.log('statuses', statuses);

    const exception = challenges[0];
    if (exception && exception instanceof HttpException) {
      throw exception;
    }
    if (exception) {
      const message = exception.message;
      throw new UnauthorizedException(message);
    }
    if (err) {
      console.log('Internal server error : ', err);
      throw new InternalServerErrorException();
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
