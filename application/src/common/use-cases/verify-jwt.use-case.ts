import { injectable } from '@auth/di';
import {
  ConfigurationServicePort,
  JwtServicePort,
  UnauthorizedException,
} from '@auth/domain';
import { PublicKeyGetter } from '../services/public-key.getter';
import { PublicJwkGetterStrategy } from '../strategy/public-key-getter-strategy/public-jwk-getter.strategy.interface';

@injectable()
export class VerifyJwtUseCase {
  constructor(
    private readonly publicKeyGetter: PublicKeyGetter,
    private readonly jwtService: JwtServicePort,
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  async perform<
    TBody extends {
      rawJwt: string;
    },
    TPublicJwkGetterStrategy extends PublicJwkGetterStrategy<TBody>,
  >(publicJwkGetterStrategy: TPublicJwkGetterStrategy, { rawJwt }: TBody) {
    const publicKeyInstance = await this.publicKeyGetter.get(
      publicJwkGetterStrategy,
      {
        rawJwt,
      },
    );
    const publicKey: string = publicKeyInstance.pem;
    const verifyOptions = {
      algorithms: this.configurationService.get(
        'jwt.verify.authorizedAlgorithms',
      ),
      audience: this.configurationService.get('jwt.verify.authorizedAudiences'),
      issuer: this.configurationService.get('jwt.verify.authorizedIssuers'),
      ignoreExpiration: false,
    };
    const payload = this.jwtService.verify(rawJwt, publicKey, verifyOptions);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
