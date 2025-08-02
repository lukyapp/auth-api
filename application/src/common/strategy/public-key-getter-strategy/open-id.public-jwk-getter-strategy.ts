import { injectable } from '@auth/di';
import {
  AuthTokenServicePort,
  ConfigurationServicePort,
  PublicKeyPemFromJwksUriGetterPort,
} from '@auth/domain';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwksUriGetter } from '../../services/jwks-uri.getter';
import { PublicKey } from '../../services/public-key.getter';
import { PublicJwkGetterStrategy } from './public-jwk-getter.strategy.interface';

export type OpenIdPublicJwkGetterStrategyBody = {
  rawJwt: string;
};

@injectable()
export class OpenIdPublicJwkGetterStrategy
  implements PublicJwkGetterStrategy<OpenIdPublicJwkGetterStrategyBody>
{
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly jwksUriGetter: JwksUriGetter,
    private readonly authTokenService: AuthTokenServicePort,
    private readonly publicKeyPemFromJwksUriGetter: PublicKeyPemFromJwksUriGetterPort,
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  async get({ rawJwt }: OpenIdPublicJwkGetterStrategyBody) {
    const jwt = this.authTokenService.decode(rawJwt, {
      withHeader: true,
    });
    if (!jwt) {
      this.logger.log('jwt payload was not well decoded');
      throw new UnauthorizedException();
    }

    const authorizedIssuers = this.configurationService.get(
      'jwt.verify.authorizedIssuers',
    );
    const { iss } = jwt.payload;
    if (!authorizedIssuers.includes(iss)) {
      this.logger.log('jwt issuer is not authorized');
      throw new UnauthorizedException();
    }

    const { alg, kid } = jwt.header;
    const { jwksUri } = await this.jwksUriGetter.get(jwt.payload);
    this.logger.log('jwksUri : ', jwksUri);
    const publickeyPem = await this.publicKeyPemFromJwksUriGetter.get({
      jwksUri,
      kid,
    });
    return new PublicKey({
      alg,
      kid,
      pem: publickeyPem,
    });
  }
}
