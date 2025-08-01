import { injectable } from '@auth/di';
import { JWK, JwksServicePort, KeyLike } from '@auth/domain';
import { createPrivateKey, createPublicKey } from 'crypto';
import { exportJWK } from 'jose';

@injectable()
export class JwksServiceJoseAdapter implements JwksServicePort {
  createPrivateKey(pem: string): KeyLike {
    return createPrivateKey(pem);
  }
  createPublicKey(privateKey: KeyLike): KeyLike {
    // @ts-expect-error lala
    return createPublicKey(privateKey);
  }
  exportJWKFromPublicKey(publicKey: KeyLike): Promise<JWK> {
    return exportJWK(publicKey);
  }
}
