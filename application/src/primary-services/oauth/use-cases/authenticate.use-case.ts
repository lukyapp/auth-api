import { AuthenticateUserResponseData } from '@auth/domain';
import { Injectable } from '@nestjs/common';
import { AuthStrategy } from '../../auth/use-cases/authenticator-strategy/auth.strategy';
import { AuthTokenServicePort } from '../../auth/ports/auth-token.service.port';

@Injectable()
export class AuthenticateUseCase {
  constructor(private readonly authTokenService: AuthTokenServicePort) {}

  async perform<TBody, TAuthStrategy extends AuthStrategy<TBody>>(
    authenticatorStrategy: TAuthStrategy,
    body: TBody,
  ): Promise<AuthenticateUserResponseData> {
    const user = await authenticatorStrategy.authenticate(body);

    const { accessToken, refreshToken } =
      await this.authTokenService.generateAuthToken({
        sub: user.id,
        email: user.email,
      });

    return {
      userId: user.id,
      accessToken,
      refreshToken,
    };
  }
}
