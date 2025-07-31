import { injectable } from '@auth/di';
import {
  OauthCallbackBody,
  OauthCallbackUseCase,
} from './use-cases/oauth-callback.use-case';
import {
  OauthSuccessBody,
  OauthSuccessUseCase,
} from './use-cases/oauth-success.use-case';

@injectable()
export class OauthPrimaryService {
  constructor(
    private readonly oauthCallbackUseCase: OauthCallbackUseCase,
    private readonly oauthSuccessUseCase: OauthSuccessUseCase,
  ) {}

  async callback(body: OauthCallbackBody) {
    return this.oauthCallbackUseCase.perform(body);
  }

  success(body: OauthSuccessBody) {
    return this.oauthSuccessUseCase.perform(body);
  }
}
