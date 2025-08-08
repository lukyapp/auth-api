import { CurrentUserDto } from './core/controller/current-user.decorator';
import { Injectable } from './core/di/injectable.decorator';

@Injectable()
export class AppService {
  getHello(currentUser?: CurrentUserDto): string {
    return `Hello ${currentUser?.email ? currentUser?.email : 'World'}!`;
  }
}
