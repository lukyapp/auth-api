import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import {
  ConfigurationServicePort,
  JwksServicePort,
  Nested,
} from '@auth/domain';
import {
  Expose,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
} from '@auth/validation';

export class JWK extends Dto<JWK> {
  // JWKParameters
  @Expose()
  @IsString()
  declare public readonly kty: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly alg?: string;
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  declare public readonly key_ops?: string[];
  @Expose()
  @IsOptional()
  @IsBoolean()
  declare public readonly ext?: boolean;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly use?: string;
  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  declare public readonly x5c?: string[];
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly x5t?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly 'x5t#S256'?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly x5u?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly kid?: string;
  // others
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly crv?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly d?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly dp?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly dq?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly e?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly k?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly n?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly p?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly q?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly qi?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly x?: string;
  @Expose()
  @IsOptional()
  @IsString()
  declare public readonly y?: string;
}

export class JwksResponse extends Dto<JwksResponse> {
  @Expose()
  @IsArray()
  @Nested(() => JWK, { each: true })
  declare public readonly keys: JWK[];
}

@injectable()
export class GetJwksUseCase {
  constructor(
    private readonly configurationService: ConfigurationServicePort,
    private readonly jwksService: JwksServicePort,
  ) {}

  perform() {
    return this.generateJwks();
  }

  private async generateJwks(): Promise<{ keys: JWK[] }> {
    const privateKeys = this.configurationService.get('jwks.privateKeys');

    const jwks: JWK[] = [];
    for (const key of privateKeys) {
      const { kid, alg, pem } = key;

      const privateKey = this.jwksService.createPrivateKey(pem);
      const publicKey = this.jwksService.createPublicKey(privateKey);

      const jwk = await this.jwksService.exportJWKFromPublicKey(publicKey);
      jwk.kid = kid;
      jwk.alg = alg;
      jwk.use = 'sig';

      jwks.push(jwk);
    }

    return new JwksResponse({ keys: jwks });
  }
}
