import { AppService } from '#controllers/hello/app.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  getHello({}: HttpContext): string {
    return this.appService.getHello()
  }

  getHelloProtected({}: HttpContext): string {
    return this.appService.getHello(undefined)
  }
}
