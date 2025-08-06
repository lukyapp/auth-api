import { injectable } from '@auth/di';
import { ConfigurationServicePort, JwtServicePort } from '@auth/domain';
import { PrivateKeyGetter } from '../services/private-key.getter';
import { GenerateJwtResponse } from './authenticate.use-case';

type Body = {
  userId: string;
  email: string;
  roles: string[];
};

@injectable()
export class GenerateRefreshJwtUseCase {
  constructor(
    private readonly privateKeyGetter: PrivateKeyGetter,
    private readonly jwtService: JwtServicePort,
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  async perform({ userId, email, roles }: Body) {
    const privateKey = this.privateKeyGetter.get();
    const payload = {
      email,
      roles,
    };
    const signOptions = {
      subject: userId,
      expiresIn: this.configurationService.get(
        'jwt.sign.refresh_token.expiration',
      ),
      issuer: this.configurationService.get('jwt.sign.issuer'),
      audience: this.configurationService.get('jwt.sign.audiences'),
      algorithm: privateKey.alg,
      keyid: privateKey.kid,
    };
    const token = this.jwtService.sign(payload, privateKey.pem, signOptions);
    const decodedJwt = this.jwtService.decode(token)!;
    const { exp: expiresIn } = decodedJwt;
    return new GenerateJwtResponse({
      type: 'Bearer',
      token,
      expiresIn,
    });
  }
}
