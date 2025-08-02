export type PublicKeyPemFromJwksUriGetterBody = {
  jwksUri: string;
  kid: string;
};

export abstract class PublicKeyPemFromJwksUriGetterPort {
  abstract get({ jwksUri }: PublicKeyPemFromJwksUriGetterBody): Promise<string>;
}
