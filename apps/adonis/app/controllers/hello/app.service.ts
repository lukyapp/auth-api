import { inject } from '@adonisjs/core'

@inject()
export class AppService {
  getHello(currentUser?: any): string {
    return `Hello ${currentUser?.email ? currentUser?.email : 'World'}!`
  }
}
