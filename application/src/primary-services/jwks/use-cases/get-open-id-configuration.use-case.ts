import { Dto, Utils } from '@auth/core';
import { injectable } from '@auth/di';
import { ConfigurationServicePort } from '@auth/domain';
import { Expose, IsCustomUrl } from '@auth/validation';

export class OpenidConfiguration extends Dto<OpenidConfiguration> {
  @Expose()
  @IsCustomUrl()
  declare public readonly jwks_uri: string;
}

@injectable()
export class GetOpenIdConfigurationUseCase {
  constructor(
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  async perform() {
    return new OpenidConfiguration({
      jwks_uri: Utils.urlJoin(
        this.configurationService.get('jwt.sign.issuer'),
        'certs',
      ),
    });
  }
}
