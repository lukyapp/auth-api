import { Dto } from '@auth/core';
import {
  Expose,
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsStringOrStringArray,
  Nested,
} from '@auth/validation';
import { MetadataError } from '../common/metadate.service';
import {
  AsymmetricAlgorithm,
  ExpiresIn,
} from '../config/environment-variables.dto';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

export class JwtHeader extends Dto<JwtHeader> {
  @Expose()
  @IsEnum(AsymmetricAlgorithm)
  declare public readonly alg: AsymmetricAlgorithm;
  @Expose()
  @IsString()
  declare public readonly kid: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly typ?: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly cty?: string;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  declare public readonly crit?: Array<
    string | Exclude<keyof JwtHeader, 'crit'>
  >;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly jku?: string;
  @Expose()
  @IsStringOrStringArray()
  @IsOptional()
  declare public readonly x5u?: string | string[];
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly 'x5t#S256'?: string;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly x5t?: string;
  @Expose()
  @IsStringOrStringArray()
  @IsOptional()
  declare public readonly x5c?: string | string[];
}

@MetadataError(UnauthorizedException)
export class JwtPayload extends Dto<JwtPayload> {
  @Expose()
  @IsString()
  declare public readonly sub: string;
  @Expose()
  @IsString()
  @IsEmail()
  declare public readonly email: string;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  declare public readonly roles: string[];
  @Expose()
  @IsString()
  // TODO use useContainer to use that
  //  but it doesn't work with async container (ex: adonis)
  // @IsInEnvArray('jwt.verify.authorizedIssuers')
  declare public readonly iss: string;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  declare public readonly aud: string[];
  @Expose()
  @IsNumber()
  declare public readonly exp: number;
  @Expose()
  @IsNumber()
  @IsOptional()
  declare public readonly nbf?: number;
  @Expose()
  @IsNumber()
  @IsOptional()
  declare public readonly iat?: number;
  @Expose()
  @IsString()
  @IsOptional()
  declare public readonly jti?: string;
}

export class Jwt extends Dto<Jwt> {
  @Expose()
  @Nested(() => JwtHeader)
  declare public readonly header: JwtHeader;
  @Expose()
  @Nested(() => JwtPayload)
  declare public readonly payload: JwtPayload;
  @Expose()
  @IsString()
  declare public readonly signature: string;
}

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

export type VerifyOptions = {
  algorithms: AsymmetricAlgorithm[];
  audience: string[];
  issuer: string[];
  clockTimestamp?: number;
  clockTolerance?: number;
  ignoreExpiration?: boolean;
  ignoreNotBefore?: boolean;
  jwtid?: string;
  /**
   * If you want to check `nonce` claim, provide a string value here.
   * It is used on Open ID for the ID Tokens. ([Open ID implementation notes](https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes))
   */
  nonce?: string;
  subject?: string;
  maxAge?: string | number;
  allowInvalidAsymmetricKeyTypes?: boolean;
};

export type DecodeOptions = {
  withHeader: boolean;
};

export abstract class JwtServicePort {
  abstract sign(
    payload: object,
    secretOrPrivateKey: string,
    options?: SignOptions,
  ): string;

  abstract decode(
    token: string,
    options: DecodeOptions & { withHeader: true },
  ): Promise<Jwt> | null;
  abstract decode(
    token: string,
    options: DecodeOptions & { withHeader: false },
  ): Promise<JwtPayload> | null;
  abstract decode(token: string): Promise<JwtPayload> | null;
  abstract decode(
    token: string,
    options?: DecodeOptions,
  ): Promise<JwtPayload | Jwt> | null;

  abstract verify(
    token: string,
    secretOrPublicKey: string,
    options?: VerifyOptions,
  ): Promise<JwtPayload> | null;
}
