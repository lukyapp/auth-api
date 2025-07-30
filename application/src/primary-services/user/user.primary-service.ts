import { injectable } from '@auth/di';
import {
  GetAllUsersBody,
  GetOneUserBody,
  UpdateUserBody,
} from '../../secondary-ports/user/ports/user.repository.port';
import { DeleteOneUserUseCase } from './use-cases/delete-one-user.use-case';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { UpdateOneUserUseCase } from './use-cases/update-one-user.use-case';

@injectable()
export class UserPrimaryService {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateOneUserUseCase: UpdateOneUserUseCase,
    private readonly deleteOneUserUseCase: DeleteOneUserUseCase,
  ) {}

  findAll(body: GetAllUsersBody) {
    return this.findAllUsersUseCase.perform(body);
  }

  findOne(body: GetOneUserBody) {
    return this.findOneUserUseCase.perform(body);
  }

  updateOne(id: string, body: UpdateUserBody) {
    return this.updateOneUserUseCase.perform(id, body);
  }

  deleteOne(id: string) {
    return this.deleteOneUserUseCase.perform(id);
  }
}
