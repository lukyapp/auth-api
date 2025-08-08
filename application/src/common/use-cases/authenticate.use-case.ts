import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import { ResponseGetOne } from '@auth/domain';
import {
  Expose,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Nested,
} from '@auth/validation';
import { AuthStrategy } from '../strategy/auth-strategy/auth.strategy.interface';
import { GenerateAccessJwtUseCase } from './generate-access-jwt.use-case';
import { GenerateRefreshJwtUseCase } from './generate-refresh-jwt.use-case';

export class GenerateJwtResponse extends Dto<GenerateJwtResponse> {
  @Expose()
  @IsString()
  declare public readonly type: string;

  @Expose()
  @IsString()
  declare public readonly token: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  declare public readonly expiresIn: number;
}

export class AuthenticateUserResponseData extends Dto<AuthenticateUserResponseData> {
  @Expose()
  @IsString()
  @IsUUID(4)
  declare public readonly userId: string;

  @Expose()
  @IsString()
  @Nested(() => GenerateJwtResponse)
  declare public readonly accessToken: GenerateJwtResponse;

  @Expose()
  @IsString()
  @Nested(() => GenerateJwtResponse)
  declare public readonly refreshToken: GenerateJwtResponse;
}

export class AuthenticateUserResponse extends ResponseGetOne<AuthenticateUserResponseData> {
  @Expose()
  @Nested(() => AuthenticateUserResponseData)
  declare public readonly data: AuthenticateUserResponseData;
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly generateAccessJwtUseCase: GenerateAccessJwtUseCase,
    private readonly generateRefreshJwtUseCase: GenerateRefreshJwtUseCase,
  ) {}

  async perform<TBody, TAuthStrategy extends AuthStrategy<TBody>>(
    authStrategy: TAuthStrategy,
    body: TBody,
  ) {
    const user = await authStrategy.authenticate(body);
    const payload = {
      userId: user.id,
      email: user.email,
      // TODO jwt roles
      roles: [] as string[],
    };
    const accessToken = await this.generateAccessJwtUseCase.perform(payload);
    const refreshToken = await this.generateRefreshJwtUseCase.perform(payload);

    return new AuthenticateUserResponse({
      userId: user.id,
      accessToken,
      refreshToken,
    });
  }
}
