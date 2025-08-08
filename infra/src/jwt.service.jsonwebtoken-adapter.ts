import { ValidationService } from '@auth/application';
import { injectable } from '@auth/di';
import {
  DecodedJwt,
  DecodedJwtPayload,
  DecodeOptions,
  JwtPayload,
  JwtServicePort,
  SignOptions,
  VerifyOptions,
} from '@auth/domain';
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
  ): Promise<DecodedJwt | null>;
  decode(
    token: string,
    options: DecodeOptions & { withHeader: false },
  ): Promise<DecodedJwtPayload | null>;
  decode(token: string): Promise<DecodedJwtPayload | null>;
  async decode(
    token: string,
    options?: DecodeOptions,
  ): Promise<DecodedJwtPayload | DecodedJwt | null> {
    if (options?.withHeader) {
      const jwt = decode(token, { complete: true });
      if (jwt) {
        return ValidationService.validate(DecodedJwt, jwt);
      }
      return null;
    }
    const payload = decode(token, { json: true });
    if (payload) {
      return ValidationService.validate(DecodedJwtPayload, payload);
    }
    return null;
  }

  async verify(
    token: string,
    secretOrPublicKey: string,
    options?: VerifyOptions,
  ): Promise<JwtPayload | null> {
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
