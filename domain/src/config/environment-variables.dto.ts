import { IsEnum, IsString } from 'class-validator';
import { Dto } from '@auth/core';

import { IsEnvArray } from './validators/is-env-array.validator';
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

export class EnvironmentVariablesDto extends Dto<EnvironmentVariablesDto> {
  // ---------- server ----------

  @IsEnum(Environment)
  declare public readonly 'server.env': Environment;

  @IsPort()
  declare public readonly 'server.port': number;

  @IsUrl()
  declare public readonly 'server.baseUrl': string;

  // ---------- jwt verify options ----------

  @IsEnvArray()
  @IsUrl({ each: true })
  declare public readonly 'jwt.verify.authorizedAudiences': string[];

  @IsEnvArray()
  @IsUrl({ each: true })
  declare public readonly 'jwt.verify.authorizedIssuers': string[];

  @IsEnvArray()
  @IsEnum(AvailableAlgorithm, { each: true })
  declare public readonly 'jwt.verify.authorizedAlgorithms': AvailableAlgorithm[];

  // ---------- jwt sign options ----------

  @IsUrl()
  declare public readonly 'jwt.sign.issuer': string;

  @IsEnvArray()
  @IsUrl({ each: true })
  declare public readonly 'jwt.sign.audiences': string[];

  @IsExpiresIn()
  declare public readonly 'jwt.sign.access_token.expiration': ExpiresIn;

  @IsExpiresIn()
  declare public readonly 'jwt.sign.refresh_token.expiration': ExpiresIn;

  // ---------- db ----------

  @IsString()
  declare public readonly 'db.host': string;

  @IsPort()
  declare public readonly 'db.port': number;

  @IsEnum(DatabaseDialect)
  declare public readonly 'db.dialect': string;

  @IsString()
  declare public readonly 'db.username': DatabaseDialect;

  @IsString()
  declare public readonly 'db.password': string;

  @IsString()
  declare public readonly 'db.name': string;

  // ---------- oauth google ----------

  @IsString()
  declare public readonly 'oauth.google.clientId': string;

  @IsString()
  declare public readonly 'oauth.google.clientSecret': string;
}
