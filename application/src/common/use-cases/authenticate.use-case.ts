import { Dto } from '@auth/core';
import { ConfigurationServicePort, JwtPayload } from '@auth/domain';
import { AuthTokenServicePort, Nested, ResponseGetOne } from '@auth/domain';
import { injectable } from '@auth/di';
import { InternalServerErrorException } from '@auth/domain';
import { Expose } from 'class-transformer';
import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { PrivateKeyGetter } from '../services/private-key.getter';
import { AuthStrategy } from '../strategy/auth-strategy/auth.strategy.interface';

export class AuthenticateUserResponseData extends Dto<AuthenticateUserResponseData> {
  @Expose()
  @IsString()
  @IsUUID(4)
  declare public readonly userId: string;

  @Expose()
  @IsString()
  declare public readonly accessToken: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly expiresIn: number;

  @Expose()
  @IsString()
  declare public readonly refreshToken: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly refreshExpiresIn: number;
}

export class AuthenticateUserResponse extends ResponseGetOne<AuthenticateUserResponseData> {
  @Expose()
  @Nested(() => AuthenticateUserResponseData)
  declare public readonly data: AuthenticateUserResponseData;
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly privateKeyGetter: PrivateKeyGetter,
    private readonly authTokenService: AuthTokenServicePort,
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  async perform<TBody, TAuthStrategy extends AuthStrategy<TBody>>(
    authStrategy: TAuthStrategy,
    body: TBody,
  ) {
    const user = await authStrategy.authenticate(body);
    const privateKey = this.privateKeyGetter.get();

    const payload = {
      email: user.email,
      // TODO jwt roles
      roles: [],
    };
    const signOptions = {
      subject: user.id,
      expiresIn: this.configurationService.get(
        'jwt.sign.access_token.expiration',
      ),
      issuer: this.configurationService.get('jwt.sign.issuer'),
      audience: this.configurationService.get('jwt.sign.audiences'),
      algorithm: privateKey.alg,
      keyid: privateKey.kid,
    };
    const accessToken = this.authTokenService.sign(
      payload,
      privateKey.pem,
      signOptions,
    );
    const refreshToken = this.authTokenService.sign(payload, privateKey.pem, {
      ...signOptions,
      expiresIn: this.configurationService.get(
        'jwt.sign.refresh_token.expiration',
      ),
    });
    const accessTokenDecoded = this.authTokenService.decode(accessToken);
    const refreshTokenDecoded = this.authTokenService.decode(accessToken);
    if (!accessTokenDecoded || !refreshTokenDecoded) {
      new InternalServerErrorException();
    }
    const { exp: expiresIn } = accessTokenDecoded as JwtPayload;
    const { exp: refreshExpiresIn } = refreshTokenDecoded as JwtPayload;
    if (!expiresIn || !refreshExpiresIn) {
      new InternalServerErrorException();
    }

    return new AuthenticateUserResponse({
      userId: user.id,
      accessToken,
      refreshToken,
      expiresIn: expiresIn!,
      refreshExpiresIn: refreshExpiresIn!,
    });
  }
}
