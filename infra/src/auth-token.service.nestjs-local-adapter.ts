import { injectable } from '@auth/di';
import {
  AuthTokenResponse,
  AuthTokenServicePort,
  ConfigurationServicePort,
  GenerateAuthTokenBody,
  GenerateAuthTokenByRefreshTokenBody,
} from '@auth/domain';
import { UnknownElementException } from '@nestjs/core/errors/exceptions';
import { JwtService } from '@nestjs/jwt';

@injectable()
export class AuthTokenServiceNestjsLocalAdapter
  implements AuthTokenServicePort
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  async generateAuthToken({
    sub,
    email,
  }: GenerateAuthTokenBody): Promise<AuthTokenResponse> {
    try {
      const accessToken = await this.jwtService.signAsync({
        sub,
        email,
      });
      const { exp: expiresIn } = this.jwtService.decode(accessToken);
      const refreshToken = await this.jwtService.signAsync(
        {
          sub,
          email,
        },
        {
          expiresIn: this.configurationService.get(
            'jwt.sign.refresh_token.expiration',
          ),
        },
      );
      const { exp: refreshExpiresIn } = this.jwtService.decode(refreshToken);

      return new AuthTokenResponse({
        accessToken,
        refreshToken,
        expiresIn: expiresIn!,
        refreshExpiresIn: refreshExpiresIn!,
      });
    } catch (error) {
      console.error('generateAuthToken error :', error);
      throw new UnknownElementException();
    }
  }

  async generateAuthTokenByRefreshToken({
    refreshToken: oldRefreshToken,
  }: GenerateAuthTokenByRefreshTokenBody): Promise<AuthTokenResponse> {
    try {
      const oldRefreshTokenDecoded = this.jwtService.decode(oldRefreshToken);
      const sub: string = oldRefreshTokenDecoded.sub as unknown as string;
      const email: string = oldRefreshTokenDecoded.email as string;

      return this.generateAuthToken({ sub, email });
    } catch (error) {
      console.error('generateAuthTokenByRefreshToken error :', error);
      throw new UnknownElementException();
    }
  }

  async logout(): Promise<void> {}
}
