/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'
import { ValidationService } from '@auth/application'
import { EnvironmentVariablesDto } from '@auth/domain'

export default await Env.create(new URL('../', import.meta.url), {
  'NODE_ENV': Env.schema.enum(['development', 'production', 'test'] as const),
  'PORT': Env.schema.number(),
  'APP_KEY': Env.schema.string(),
  'HOST': Env.schema.string({ format: 'host' }),
  'LOG_LEVEL': Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring session package
  |----------------------------------------------------------
  */
  'SESSION_DRIVER': Env.schema.enum(['cookie', 'memory'] as const),

  /*
  |----------------------------------------------------------
  | server
  |----------------------------------------------------------
  */

  'server.env': Env.schema.string(),
  'server.port': Env.schema.string(),
  'server.baseUrl': Env.schema.string(),

  /*
  |----------------------------------------------------------
  | jwt verify options
  |----------------------------------------------------------
  */

  'jwt.verify.authorizedAudiences': Env.schema.string(),
  'jwt.verify.authorizedIssuers': Env.schema.string(),
  'jwt.verify.authorizedAlgorithms': Env.schema.string(),

  /*
  |----------------------------------------------------------
  | jwt sign options
  |----------------------------------------------------------
  */

  'jwt.sign.issuer': Env.schema.string(),
  'jwt.sign.audiences': Env.schema.string(),
  'jwt.sign.access_token.expiration': Env.schema.string(),
  'jwt.sign.refresh_token.expiration': Env.schema.string(),
  'jwt.sign.privateKeyKid': Env.schema.string(),

  /*
  |----------------------------------------------------------
  | jwks private keys
  |----------------------------------------------------------
  */

  'jwks.privateKeys': Env.schema.string(),

  /*
  |----------------------------------------------------------
  | db
  |----------------------------------------------------------
  */

  'db.host': Env.schema.string(),
  'db.port': Env.schema.string(),
  'db.dialect': Env.schema.string(),
  'db.username': Env.schema.string(),
  'db.password': Env.schema.string(),
  'db.name': Env.schema.string(),

  /*
  |----------------------------------------------------------
  | oauth google
  |----------------------------------------------------------
  */
  'oauth.google.clientId': Env.schema.string(),
  'oauth.google.clientSecret': Env.schema.string(),
})

ValidationService.validate(EnvironmentVariablesDto, process.env)
