import {
  AsymmetricAlgorithm,
  ExpiresIn,
} from '../config/environment-variables.dto';

export type JwtHeader = {
  alg: AsymmetricAlgorithm;
  kid: string;
  typ?: string;
  cty?: string;
  crit?: Array<string | Exclude<keyof JwtHeader, 'crit'>>;
  jku?: string;
  x5u?: string | string[];
  'x5t#S256'?: string;
  x5t?: string;
  x5c?: string | string[];
};

export type SignOptions = {
  algorithm: AsymmetricAlgorithm;
  keyid: string;
  expiresIn: ExpiresIn | number;
  audience: string[];
  subject: string;
  issuer: string;
  jwtid?: string;
  notBefore?: ExpiresIn | number;
  mutatePayload?: boolean;
  noTimestamp?: boolean;
  header?: JwtHeader;
  encoding?: string;
  allowInsecureKeySizes?: boolean;
  allowInvalidAsymmetricKeyTypes?: boolean;
};

export type JwtPayload = {
  [key: string]: any;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
};

export abstract class AuthTokenServicePort {
  abstract sign(
    payload: object,
    secretOrPrivateKey: string,
    options?: SignOptions,
  ): string;

  abstract decode(token: string): null | JwtPayload;
}
