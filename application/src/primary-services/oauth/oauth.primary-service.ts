import { injectable } from '../../ioc/injectable.decorator';
import {
  OauthAuthorizeBody,
  OauthAuthorizeUseCase,
} from './use-cases/oauth-authorize.use-case';
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
    private readonly oauthAuthorizeUseCase: OauthAuthorizeUseCase,
    private readonly oauthCallbackUseCase: OauthCallbackUseCase,
    private readonly oauthSuccessUseCase: OauthSuccessUseCase,
  ) {}

  authorize(body: OauthAuthorizeBody): void | Promise<void> {
    return this.oauthAuthorizeUseCase.perform(body);
  }

  async callback(body: OauthCallbackBody): Promise<string> {
    return this.oauthCallbackUseCase.perform(body);
  }

  success(body: OauthSuccessBody) {
    return this.oauthSuccessUseCase.perform(body);
  }
}
