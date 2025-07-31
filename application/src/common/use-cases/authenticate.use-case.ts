import { Dto } from '@auth/core';
import { AuthTokenServicePort, Nested, ResponseGetOne } from '@auth/domain';
import { injectable } from '@auth/di';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { AuthStrategy } from '../strategy/auth-strategy/auth.strategy.interface';

export class AuthenticateUserResponseData extends Dto<AuthenticateUserResponseData> {
  @Expose()
  declare public readonly userId: string;

  @Expose()
  declare public readonly accessToken: string;

  @Expose()
  @IsOptional()
  declare public readonly refreshToken?: string;
}

export class AuthenticateUserResponse extends ResponseGetOne<AuthenticateUserResponseData> {
  @Expose()
  @Nested(() => AuthenticateUserResponseData)
  declare public readonly data: AuthenticateUserResponseData;
}

@injectable()
export class AuthenticateUseCase {
  constructor(private readonly authTokenService: AuthTokenServicePort) {}

  async perform<TBody, TAuthStrategy extends AuthStrategy<TBody>>(
    authStrategy: TAuthStrategy,
    body: TBody,
  ) {
    const user = await authStrategy.authenticate(body);

    const { accessToken, refreshToken } =
      await this.authTokenService.generateAuthToken({
        sub: user.id,
        email: user.email,
      });

    return new AuthenticateUserResponse({
      userId: user.id,
      accessToken,
      refreshToken,
    });
  }
}
