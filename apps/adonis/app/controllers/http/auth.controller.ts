import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { AuthPrimaryService, ValidationService } from '@auth/application'
import { SignInBody, SignUpBody } from '@auth/controller-dtos'

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
