import { Dto } from '@auth/core';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

import { IsEnvArray } from './validators/is-env-array.validator';
import { IsEnvJsonArray } from './validators/is-env-json-array.validator';
import { IsExpiresIn } from './validators/is-expires-in.validator';
import { IsPort } from './validators/is-port.validator';
import { IsUrl } from './validators/is-url.validator';

export type ExpiresIn =
  | `${number}m`
  | `${number}h`
  | `${number}d`
  | `${number}w`
  | `${number}y`;

export enum AvailableAlgorithm {
  HS256 = 'HS256',
  HS384 = 'HS384',
  HS512 = 'HS512',
  RS256 = 'RS256',
  RS384 = 'RS384',
  RS512 = 'RS512',
  ES256 = 'ES256',
  ES384 = 'ES384',
  ES512 = 'ES512',
  PS256 = 'PS256',
  PS384 = 'PS384',
  PS512 = 'PS512',
}

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Preproduction = 'preproduction',
}

export enum DatabaseDialect {
  Mysql = 'mysql',
  Postgres = 'postgres',
  Sqlite = 'sqlite',
  Mariadb = 'mariadb',
  Mssql = 'mssql',
}

class PrivateKeys extends Dto<PrivateKeys> {
  @Expose()
  @IsString()
  declare public readonly kid: string;
  @Expose()
  @IsString()
  declare public readonly pem: string;
  @Expose()
  @IsEnum(AvailableAlgorithm)
  declare public readonly alg: AvailableAlgorithm;
}

export class EnvironmentVariablesDto extends Dto<EnvironmentVariablesDto> {
  // ---------- server ----------

  @Expose()
  @IsEnum(Environment)
  declare public readonly 'server.env': Environment;

  @Expose()
  @IsPort()
  declare public readonly 'server.port': number;

  @Expose()
  @IsUrl()
  declare public readonly 'server.baseUrl': string;

  // ---------- jwt verify options ----------

  @Expose()
  @IsEnvArray()
  @IsUrl({ each: true })
  declare public readonly 'jwt.verify.authorizedAudiences': string[];

  @Expose()
  @IsEnvArray()
  @IsUrl({ each: true })
  declare public readonly 'jwt.verify.authorizedIssuers': string[];

  @Expose()
  @IsEnvArray()
  @IsEnum(AvailableAlgorithm, { each: true })
  declare public readonly 'jwt.verify.authorizedAlgorithms': AvailableAlgorithm[];

  // ---------- jwt sign options ----------

  @Expose()
  @IsUrl()
  declare public readonly 'jwt.sign.issuer': string;

  @Expose()
  @IsEnvArray()
  @IsUrl({ each: true })
  declare public readonly 'jwt.sign.audiences': string[];

  @Expose()
  @IsExpiresIn()
  declare public readonly 'jwt.sign.access_token.expiration': ExpiresIn;

  @Expose()
  @IsExpiresIn()
  declare public readonly 'jwt.sign.refresh_token.expiration': ExpiresIn;

  // ---------- jwt private keys ----------

  @Expose()
  @IsEnvJsonArray(() => PrivateKeys)
  declare public readonly 'jwt.sign.private_keys': PrivateKeys[];

  // ---------- db ----------

  @Expose()
  @IsString()
  declare public readonly 'db.host': string;

  @Expose()
  @IsPort()
  declare public readonly 'db.port': number;

  @Expose()
  @IsEnum(DatabaseDialect)
  declare public readonly 'db.dialect': string;

  @Expose()
  @IsString()
  declare public readonly 'db.username': DatabaseDialect;

  @Expose()
  @IsString()
  declare public readonly 'db.password': string;

  @Expose()
  @IsString()
  declare public readonly 'db.name': string;

  // ---------- oauth google ----------

  @Expose()
  @IsString()
  declare public readonly 'oauth.google.clientId': string;

  @Expose()
  @IsString()
  declare public readonly 'oauth.google.clientSecret': string;
}
