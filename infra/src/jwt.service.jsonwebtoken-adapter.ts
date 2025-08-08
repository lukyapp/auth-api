import { injectable } from '@auth/di';
import {
  JwtServicePort,
  JwtPayload,
  SignOptions,
  VerifyOptions,
  Jwt,
  DecodeOptions,
} from '@auth/domain';
import { ValidationService } from '@auth/application';
import { decode, sign, verify } from 'jsonwebtoken';

@injectable()
export class JwtServiceJsonwebtokenAdapter implements JwtServicePort {
  constructor() {}

  sign(
    payload: object,
    secretOrPrivateKey: string,
    options?: SignOptions,
  ): string {
    return sign(payload, secretOrPrivateKey, options);
  }

  decode(
    token: string,
    options: DecodeOptions & { withHeader: true },
  ): Promise<Jwt> | null;
  decode(
    token: string,
    options: DecodeOptions & { withHeader: false },
  ): Promise<JwtPayload> | null;
  decode(token: string): Promise<JwtPayload> | null;
  decode(
    token: string,
    options?: DecodeOptions,
  ): Promise<JwtPayload | Jwt> | null {
    if (options?.withHeader) {
      const jwt = decode(token, { complete: true });
      if (jwt) {
        return ValidationService.validate(Jwt, jwt);
      }
      return null;
    }
    const jwt = decode(token, { json: true });
    if (jwt) {
      return ValidationService.validate(JwtPayload, jwt);
    }
    return null;
  }

  verify(
    token: string,
    secretOrPublicKey: string,
    options?: VerifyOptions,
  ): Promise<JwtPayload> | null {
    const jwt = verify(
      token,
      secretOrPublicKey,
      // @ts-expect-error verifyOptions
      { complete: false, ...options } as const,
    );
    if (typeof jwt === 'string') {
      return null;
    }
    return ValidationService.validate(JwtPayload, jwt);
  }
}
