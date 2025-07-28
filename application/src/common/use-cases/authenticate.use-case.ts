import { AuthenticateUserResponseData } from '@auth/domain';
import { Injectable } from '@nestjs/common';
import { AuthTokenServicePort } from '../ports/auth-token.service.port';
import { AuthStrategy } from '../strategy/auth-strategy/auth.strategy.interface';

@Injectable()
export class AuthenticateUseCase {
  constructor(private readonly authTokenService: AuthTokenServicePort) {}

  async perform<TBody, TAuthStrategy extends AuthStrategy<TBody>>(
    authStrategy: TAuthStrategy,
    body: TBody,
  ): Promise<AuthenticateUserResponseData> {
    const user = await authStrategy.authenticate(body);

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
