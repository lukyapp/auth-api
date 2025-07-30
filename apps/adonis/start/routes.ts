/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/http/auth.controller'
import OauthController from '#controllers/http/oauth.controller'
import UserController from '#controllers/http/user.controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => 'It works!')

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
