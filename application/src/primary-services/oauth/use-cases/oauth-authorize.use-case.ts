import { Dto } from '@auth/core';
import { OauthProviderName } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { injectable } from '../../../ioc/injectable.decorator';

export class OauthAuthorizeBody extends Dto<OauthAuthorizeBody> {
  declare public readonly oauthProviderName: OauthProviderName;
}

@injectable()
export class OauthAuthorizeUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor() {}

  async perform({ oauthProviderName }: OauthAuthorizeBody) {
    this.logger.log(`oauth authorize with ${oauthProviderName} provider`);
  }
}
