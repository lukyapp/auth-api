import { injectable } from '@auth/di';
import {
  AuthTokenResponse,
  AuthTokenServicePort,
  GenerateAuthTokenBody,
  GenerateAuthTokenByRefreshTokenBody,
} from '@auth/domain';
import { UnknownElementException } from '@nestjs/core/errors/exceptions';

@injectable()
export class AuthTokenServiceAdonisLocalAdapter
  implements AuthTokenServicePort
{
  constructor() {}

  generateAuthToken({
    sub,
    email,
  }: GenerateAuthTokenBody): Promise<AuthTokenResponse> {
    try {
      // TODO
      console.log('generateAuthToken : ', sub, email);
      const accessToken = 'accessTokenaccessToken';
      const expiresIn = 1000;
      const refreshToken = 'refreshTokenrefreshToken';
      const refreshExpiresIn = 7000;

      return Promise.resolve(
        new AuthTokenResponse({
          accessToken,
          refreshToken,
          expiresIn: expiresIn,
          refreshExpiresIn: refreshExpiresIn,
        }),
      );
    } catch (error) {
      console.error('generateAuthToken error :', error);
      throw new UnknownElementException();
    }
  }

  async generateAuthTokenByRefreshToken({
    refreshToken: oldRefreshToken,
  }: GenerateAuthTokenByRefreshTokenBody): Promise<AuthTokenResponse> {
    try {
      // TODO
      console.log('generateAuthTokenByRefreshToken : ', oldRefreshToken);
      const sub: string = 'oldRefreshTokenDecoded.sub';
      const email: string = 'oldRefreshTokenDecoded.email';

      return this.generateAuthToken({ sub, email });
    } catch (error) {
      console.error('generateAuthTokenByRefreshToken error :', error);
      throw new UnknownElementException();
    }
  }

  async logout(): Promise<void> {}
}
