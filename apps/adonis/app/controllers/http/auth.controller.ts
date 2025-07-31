import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { AuthPrimaryService, SignInBody, SignUpBody, ValidationService } from '@auth/application'

@inject()
export default class AuthController {
  constructor(private authPrimaryService: AuthPrimaryService) {}

  async signUp({ request }: HttpContext) {
    const body = ValidationService.validate(SignUpBody, request.body())
    return this.authPrimaryService.signUp(body)
  }

  async signIn({ request }: HttpContext) {
    const body = ValidationService.validate(SignInBody, request.body())
    return this.authPrimaryService.signIn(body)
  }
}
