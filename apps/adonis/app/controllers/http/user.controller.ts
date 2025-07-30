import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { UserPrimaryService, ValidationService } from '@auth/application'
import { AuthDetailEndpointParam, GetAllUsersQuery, UpdateUserBody } from '@auth/controller-dtos'

@inject()
export default class UserController {
  constructor(private readonly userPrimaryService: UserPrimaryService) {}

  findAll({ request }: HttpContext) {
    const body = ValidationService.validate(GetAllUsersQuery, request.qs())
    return this.userPrimaryService.findAll(body)
  }

  findOne({ request }: HttpContext) {
    const { userId } = ValidationService.validate(AuthDetailEndpointParam, request.params())
    return this.userPrimaryService.findOne({ id: userId })
  }

  updateOne({ request }: HttpContext) {
    const { userId } = ValidationService.validate(AuthDetailEndpointParam, request.params())
    const body = ValidationService.validate(UpdateUserBody, request.body())
    return this.userPrimaryService.updateOne(userId, body)
  }

  deleteOne({ request }: HttpContext) {
    const { userId } = ValidationService.validate(AuthDetailEndpointParam, request.params())
    return this.userPrimaryService.deleteOne(userId)
  }
}
