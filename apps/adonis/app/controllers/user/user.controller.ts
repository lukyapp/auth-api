import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import {
  GetAllUsersBody,
  UpdateUserBody,
  UserPrimaryService,
  ValidationService,
} from '@auth/application'
import { UserDetailEndpointParam } from '@auth/controller-dtos'

@inject()
export default class UserController {
  constructor(private readonly userPrimaryService: UserPrimaryService) {}

  async findAll({ request }: HttpContext) {
    const body = await ValidationService.validate(GetAllUsersBody, request.qs())
    return this.userPrimaryService.findAll(body)
  }

  async findOne({ request }: HttpContext) {
    const { userId } = await ValidationService.validate(UserDetailEndpointParam, request.params())
    return this.userPrimaryService.findOne({ id: userId })
  }

  async updateOne({ request }: HttpContext) {
    const { userId } = await ValidationService.validate(UserDetailEndpointParam, request.params())
    const body = await ValidationService.validate(UpdateUserBody, request.body())
    return this.userPrimaryService.updateOne(userId, body)
  }

  async deleteOne({ request }: HttpContext) {
    const { userId } = await ValidationService.validate(UserDetailEndpointParam, request.params())
    return this.userPrimaryService.deleteOne(userId)
  }
}
