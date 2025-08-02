import {
  PublicKeyPemFromJwksUriGetterBody,
  PublicKeyPemFromJwksUriGetterPort,
} from '@auth/domain';
import { JwksClient } from 'jwks-rsa';

export class PublicKeyPemFromJwksUriGetterJwksRsaAdapter
  implements PublicKeyPemFromJwksUriGetterPort
{
  async get({
    jwksUri,
    kid,
  }: PublicKeyPemFromJwksUriGetterBody): Promise<string> {
    const client = new JwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri,
    });
    const key = await client.getSigningKey(kid);
    return key.getPublicKey();
  }
}
