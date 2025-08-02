import { Dto } from '@auth/core';
import { injectable } from '@auth/di';
import { AsymmetricAlgorithm } from '@auth/domain';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { PublicJwkGetterStrategy } from '../strategy/public-key-getter-strategy/public-jwk-getter.strategy.interface';

export class PublicKey extends Dto<PublicKey, 'type'> {
  @Expose()
  @IsString()
  declare public readonly type = 'public';
  @Expose()
  @IsString()
  declare public readonly kid: string;
  @Expose()
  @IsString()
  declare public readonly pem: string;
  @Expose()
  @IsEnum(AsymmetricAlgorithm)
  declare public readonly alg: AsymmetricAlgorithm;
}

@injectable()
export class PublicKeyGetter {
  constructor() {}

  async get<
    TBody,
    TPublicJwkGetterStrategy extends PublicJwkGetterStrategy<TBody>,
  >(publicJwkGetterStrategy: TPublicJwkGetterStrategy, body: TBody) {
    return publicJwkGetterStrategy.get(body);
  }
}
