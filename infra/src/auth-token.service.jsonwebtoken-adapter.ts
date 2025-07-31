import { PrivateKeyGetter } from '@auth/application';
import { injectable } from '@auth/di';
import {
  AuthTokenResponse,
  AuthTokenServicePort,
  ConfigurationServicePort,
  GenerateAuthTokenBody,
  GenerateAuthTokenByRefreshTokenBody,
} from '@auth/domain';
import { decode, JwtPayload, sign } from 'jsonwebtoken';

@injectable()
export class AuthTokenServiceJsonwebtokenAdapter
  implements AuthTokenServicePort
{
  constructor(
    private readonly configurationService: ConfigurationServicePort,
    private readonly privateKeyGetter: PrivateKeyGetter,
  ) {}

  async generateAuthToken({
    sub,
    email,
  }: GenerateAuthTokenBody): Promise<AuthTokenResponse> {
    const privateKey = this.privateKeyGetter.get();
    const signOptions = {
      expiresIn: this.configurationService.get(
        'jwt.sign.access_token.expiration',
      ),
      issuer: this.configurationService.get('jwt.sign.issuer'),
      audience: this.configurationService.get('jwt.sign.audiences'),
      algorithm: privateKey.alg,
      keyid: privateKey.kid,
    };
    const accessToken = sign({ sub, email }, privateKey.pem, signOptions);
    const { exp: expiresIn } = decode(accessToken) as JwtPayload;

    const refreshToken = sign({ sub, email }, privateKey.pem, {
      ...signOptions,
      expiresIn: this.configurationService.get(
        'jwt.sign.refresh_token.expiration',
      ),
    });
    const { exp: refreshExpiresIn } = decode(refreshToken) as JwtPayload;

    return new AuthTokenResponse({
      accessToken,
      refreshToken,
      expiresIn: expiresIn!,
      refreshExpiresIn: refreshExpiresIn!,
    });
  }

  async generateAuthTokenByRefreshToken({
    refreshToken: oldRefreshToken,
  }: GenerateAuthTokenByRefreshTokenBody): Promise<AuthTokenResponse> {
    const decoded = decode(oldRefreshToken) as JwtPayload;

    const sub = decoded?.sub as string;
    const email = decoded?.email as string;

    return this.generateAuthToken({ sub, email });
  }

  async logout(): Promise<void> {
    // Stateless logout: no-op unless using a token blacklist
  }
}
