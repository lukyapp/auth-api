import { Injectable } from '@nestjs/common';
import { CurrentUserDto } from './core/controller/current-user.decorator';

@Injectable()
export class AppService {
  getHello(currentUser?: CurrentUserDto): string {
    return `Hello ${currentUser?.email ? currentUser?.email : 'World'}!`;
  }
}
