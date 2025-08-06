import { injectable } from '@auth/di';
import {
  JwtServicePort,
  ConfigurationServicePort,
  JwksServicePort,
} from '@auth/domain';
import { UnauthorizedException } from '@auth/domain';
import { GenericService } from '../../logger/generic.service';
import { PublicKey } from '../../services/public-key.getter';
import { PublicJwkGetterStrategy } from './public-jwk-getter.strategy.interface';

export type LocalPublicJwkGetterStrategyBody = {
  rawJwt: string;
};

@injectable()
export class LocalPublicJwkGetterStrategy
  extends GenericService
  implements PublicJwkGetterStrategy<LocalPublicJwkGetterStrategyBody>
{
  constructor(
    private readonly jwtService: JwtServicePort,
    private readonly jwksService: JwksServicePort,
    private readonly configurationService: ConfigurationServicePort,
  ) {
    super();
  }

  async get({ rawJwt }: LocalPublicJwkGetterStrategyBody) {
    const jwt = this.jwtService.decode(rawJwt, {
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

    const privateKeys = this.configurationService.get('jwks.privateKeys');
    const privateKey = privateKeys.find((key) => key.kid === kid);
    if (!privateKey) {
      this.logger.log(`Unable to find a signing key that matches '${kid}'`);
      throw new UnauthorizedException();
    }
    const privateKeyy = this.jwksService.createPrivateKey(privateKey.pem);
    const publicKey = this.jwksService.createPublicKey(privateKeyy);

    const jwk = await this.jwksService.exportJWKFromPublicKey(publicKey);
    jwk.kid = kid;
    jwk.alg = alg;
    jwk.use = 'sig';
    const pem = await this.jwksService.importJWKToPem(jwk);
    return new PublicKey({
      alg,
      kid,
      pem,
    });
  }
}
