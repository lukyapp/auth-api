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
import router from '@adonisjs/core/services/router'

router.get('/', async () => 'It works!')

router.get('/unprotected', [AppController, 'getHello'])
router.get('/protected', [AppController, 'getHelloProtected'])

router.post('/auth/sign-up', [AuthController, 'signUp'])
router.post('/auth/sign-in', [AuthController, 'signIn'])

router.get('/users', [UserController, 'findAll'])
router.get('/users/:userId', [UserController, 'findOne'])
router.patch('/users/:userId', [UserController, 'updateOne'])
router.delete('/users/:userId', [UserController, 'deleteOne'])

router
  .get('/oauth/:oauthProviderName/authorize', [OauthController, 'authorize'])
  .where('oauthProviderName', /google/)
router.get('/oauth/:oauthProviderName/callback', [OauthController, 'callback'])
router.get('/oauth/:oauthProviderName/success', [OauthController, 'success'])

router.get('/certs', [JwksController, 'getJwks'])
router.get('/.well-known/openid-configuration', [JwksController, 'getOpenidConfiguration'])
