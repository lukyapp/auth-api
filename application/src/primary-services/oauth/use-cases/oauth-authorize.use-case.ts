import { Dto } from '@auth/core';
import { OauthProviderName } from '@auth/domain';
import { Injectable, Logger } from '@nestjs/common';

export class OauthAuthorizeBody extends Dto<OauthAuthorizeBody> {
  declare public readonly oauthProviderName: OauthProviderName;
}

@Injectable()
export class OauthAuthorizeUseCase {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor() {}

  async perform({ oauthProviderName }: OauthAuthorizeBody) {
    this.logger.log(`oauth authorize with ${oauthProviderName} provider`);
  }
}
