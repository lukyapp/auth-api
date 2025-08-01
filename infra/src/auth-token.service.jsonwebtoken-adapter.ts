import { injectable } from '@auth/di';
import { AuthTokenServicePort, JwtPayload, SignOptions } from '@auth/domain';
import { decode, sign } from 'jsonwebtoken';

@injectable()
export class AuthTokenServiceJsonwebtokenAdapter
  implements AuthTokenServicePort
{
  constructor() {}

  sign(
    payload: object,
    secretOrPrivateKey: string,
    options?: SignOptions,
  ): string {
    return sign(payload, secretOrPrivateKey, options);
  }

  decode(token: string): null | JwtPayload {
    // @ts-expect-error lala
    return decode(token);
  }
}
