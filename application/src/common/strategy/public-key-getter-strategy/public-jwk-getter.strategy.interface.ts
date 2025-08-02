import { PublicKey } from '../../services/public-key.getter';

export abstract class PublicJwkGetterStrategy<TBody> {
  abstract get(body: TBody): Promise<PublicKey>;
}
