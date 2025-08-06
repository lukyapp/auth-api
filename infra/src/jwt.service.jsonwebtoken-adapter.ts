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
  ): null | Jwt;
  decode(
    token: string,
    options: DecodeOptions & { withHeader: false },
  ): null | JwtPayload;
  decode(token: string): null | JwtPayload;
  decode(token: string, options?: DecodeOptions): JwtPayload | Jwt | null {
    if (options?.withHeader) {
      const jwt = decode(token, { complete: true });
      return ValidationService.validate(Jwt, jwt);
    }
    const jwt = decode(token, { json: true });
    return ValidationService.validate(JwtPayload, jwt);
  }

  verify(
    token: string,
    secretOrPublicKey: string,
    options?: VerifyOptions,
  ): null | JwtPayload {
    const jwt = verify(
      token,
      secretOrPublicKey,
      // @ts-expect-error verifyOptions
      { complete: false, ...options },
    );
    return ValidationService.validate(JwtPayload, jwt);
  }
}
