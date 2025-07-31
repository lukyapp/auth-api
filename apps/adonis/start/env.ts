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

const validate = (name: string, value?: string) => {
  return ValidationService.validateOneField(EnvironmentVariablesDto, value, name)
}

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

  'server.env': validate,
  'server.port': validate,
  'server.baseUrl': validate,

  /*
  |----------------------------------------------------------
  | jwt verify options
  |----------------------------------------------------------
  */

  'jwt.verify.authorizedAudiences': validate,
  'jwt.verify.authorizedIssuers': validate,
  'jwt.verify.authorizedAlgorithms': validate,

  /*
  |----------------------------------------------------------
  | jwt sign options
  |----------------------------------------------------------
  */

  'jwt.sign.issuer': validate,
  'jwt.sign.audiences': validate,
  'jwt.sign.access_token.expiration': validate,
  'jwt.sign.refresh_token.expiration': validate,

  /*
  |----------------------------------------------------------
  | jwt private keys
  |----------------------------------------------------------
  */

  'jwt.sign.private_keys': validate,

  /*
  |----------------------------------------------------------
  | db
  |----------------------------------------------------------
  */

  'db.host': validate,
  'db.port': validate,
  'db.dialect': validate,
  'db.username': validate,
  'db.password': validate,
  'db.name': validate,

  /*
  |----------------------------------------------------------
  | oauth google
  |----------------------------------------------------------
  */
  'oauth.google.clientId': validate,
  'oauth.google.clientSecret': validate,
})
