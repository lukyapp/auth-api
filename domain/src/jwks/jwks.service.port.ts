import { Dto } from '@auth/core';

export class JWK extends Dto<JWK> {
  declare public kty: string;
  declare public alg?: string;
  declare public key_ops?: string[];
  declare public ext?: boolean;
  declare public use?: string;
  declare public x5c?: string[];
  declare public x5t?: string;
  declare public 'x5t#S256'?: string;
  declare public x5u?: string;
  declare public kid?: string;
  declare public crv?: string;
  declare public d?: string;
  declare public dp?: string;
  declare public dq?: string;
  declare public e?: string;
  declare public k?: string;
  declare public n?: string;
  declare public p?: string;
  declare public q?: string;
  declare public qi?: string;
  declare public x?: string;
  declare public y?: string;
}

export type KeyLike = { type: 'secret' | 'public' | 'private' } | Uint8Array;

export abstract class JwksServicePort {
  abstract createPrivateKey(pem: string): KeyLike;

  abstract createPublicKey(privateKey: KeyLike): KeyLike;

  abstract exportJWKFromPublicKey(keyLike: KeyLike): Promise<JWK>;

  abstract importJWKToPem(jwk: JWK): Promise<string>;
}
