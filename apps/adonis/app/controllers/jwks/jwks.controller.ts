import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { JwksPrimaryService } from '@auth/application'

@inject()
export default class JwksController {
  constructor(private readonly jwksPrimaryService: JwksPrimaryService) {}

  getJwks({}: HttpContext) {
    return this.jwksPrimaryService.getJwks()
  }

  getOpenidConfiguration({}: HttpContext) {
    return this.jwksPrimaryService.getOpenidConfiguration()
  }
}
