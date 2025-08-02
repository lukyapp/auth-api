import { injectable } from '@auth/di';
import { JWK, JwksServicePort, KeyLike } from '@auth/domain';
import { createPrivateKey, createPublicKey } from 'crypto';
import { exportJWK, exportSPKI, importJWK } from 'jose';

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
  async importJWKToPem(jwk: JWK): Promise<string> {
    const key = await importJWK(jwk);
    if (!this.isKeyLike(key)) {
      throw new Error('Cannot import jwk');
    }
    let getSpki: () => string;
    // @ts-expect-error from jwks-rsa lib
    switch (key[Symbol.toStringTag]) {
      case 'CryptoKey': {
        const spki = await exportSPKI(key);
        getSpki = () => spki;
        break;
      }
      case 'KeyObject':
      // Assume legacy Node.js version without the Symbol.toStringTag backported
      // Fall through
      default:
        // @ts-expect-error from jwks-rsa lib
        getSpki = () => key.export({ format: 'pem', type: 'spki' });
    }
    return getSpki();
  }

  private isKeyLike(value: any): value is { type: 'private' | 'public' } {
    return !!value.type;
  }
}
