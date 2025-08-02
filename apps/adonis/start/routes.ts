/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth/auth.controller')
const OauthController = () => import('#controllers/oauth/oauth.controller')
const UserController = () => import('#controllers/user/user.controller')
const AppController = () => import('#controllers/hello/app.controller')
const JwksController = () => import('#controllers/jwks/jwks.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

/*
  |----------------------------------------------------------
  | health check
  |----------------------------------------------------------
  */

router.get('/', async () => 'It works!')

/*
  |----------------------------------------------------------
  | exemples guards
  |----------------------------------------------------------
  */

router.get('/unprotected', [AppController, 'getHello'])
router.get('/protected', [AppController, 'getHelloProtected'])

/*
  |----------------------------------------------------------
  | auth
  |----------------------------------------------------------
  */

router.post('/auth/sign-up', [AuthController, 'signUp'])
router.post('/auth/sign-in', [AuthController, 'signIn'])

/*
  |----------------------------------------------------------
  | users
  |----------------------------------------------------------
  */

router.get('/users', [UserController, 'findAll'])
router.get('/users/:userId', [UserController, 'findOne'])
router.patch('/users/:userId', [UserController, 'updateOne'])
router.delete('/users/:userId', [UserController, 'deleteOne'])

/*
  |----------------------------------------------------------
  | oauth
  |----------------------------------------------------------
  */

router
  .get('/oauth/:oauthProviderName/authorize', [OauthController, 'authorize'])
  .where('oauthProviderName', /google/)
router.get('/oauth/:oauthProviderName/callback', [OauthController, 'callback'])
router.get('/oauth/:oauthProviderName/success', [OauthController, 'success'])

/*
  |----------------------------------------------------------
  | jwks
  |----------------------------------------------------------
  */

router.get('/certs', [JwksController, 'getJwks'])
router.get('/.well-known/openid-configuration', [JwksController, 'getOpenidConfiguration'])

/*
  |----------------------------------------------------------
  | exemple
  |----------------------------------------------------------
  */

router.post('/exemple/login', async ({ request, auth }) => {
  const { email } = request.all()
  const user = { email }

  return await auth.use('openId').generate(user)
})
router.post('/exemple/login2', async ({ auth }) => {
  return await auth.use('openId').authenticate()
})
router
  .get('/exemple/user', async ({ auth }) => {
    return auth.getUserOrFail()
  })
  .use(middleware.auth())
