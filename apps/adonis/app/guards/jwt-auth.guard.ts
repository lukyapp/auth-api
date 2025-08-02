import { errors, symbols } from '@adonisjs/auth'
import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'
import { HttpContext } from '@adonisjs/core/http'
import {
  AuthenticateUseCase,
  NoPasswordCheckAuthStrategy,
  OpenIdPublicJwkGetterStrategy,
  PublicKeyGetter,
} from '@auth/application'
import {
  AuthTokenServicePort,
  ConfigurationServicePort,
  UserDto,
  UserRepositoryPort,
} from '@auth/domain'

/**
 * The bridge between the User provider and the
 * Guard
 */
export type JwtGuardUser<RealUser> = {
  /**
   * Returns the unique ID of the user
   */
  getId(): string | number | BigInt

  /**
   * Returns the original user object
   */
  getOriginal(): RealUser
}

/**
 * The interface for the UserProvider accepted by the
 * JWT guard.
 */
export interface JwtUserProviderContract<RealUser> {
  /**
   * A property the guard implementation can use to infer
   * the data type of the actual user (aka RealUser)
   */
  [symbols.PROVIDER_REAL_USER]: RealUser

  /**
   * Create a user object that acts as an adapter between
   * the guard and real user value.
   */
  createUserForGuard(user: RealUser): Promise<JwtGuardUser<RealUser>>

  /**
   * Find a user by their id.
   */
  findById(identifier: string | number | BigInt): Promise<JwtGuardUser<RealUser> | null>
}

export class JwtGuard<
  // UserProvider extends JwtUserProviderContract<unknown>,
  TUserDto extends UserDto,
> implements
    GuardContract<// UserProvider[typeof symbols.PROVIDER_REAL_USER]
    TUserDto>
{
  /**
   * A list of events and their types emitted by
   * the guard.
   */
  declare [symbols.GUARD_KNOWN_EVENTS]: {}
  /**
   * A unique name for the guard driver
   */
  driverName: 'jwt' = 'jwt'
  /**
   * A flag to know if the authentication was an attempt
   * during the current HTTP request
   */
  authenticationAttempted: boolean = false
  /**
   * A boolean to know if the current request has
   * been authenticated
   */
  isAuthenticated: boolean = false
  /**
   * Reference to the currently authenticated user
   */
  // user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  user?: TUserDto
  // #userProvider: UserProvider
  #ctx: HttpContext
  #authTokenService: AuthTokenServicePort
  #configurationService: ConfigurationServicePort
  #userRepository: UserRepositoryPort
  #publicKeyGetter: PublicKeyGetter
  #openIdPublicJwkGetterStrategy: OpenIdPublicJwkGetterStrategy
  #authenticateUseCase: AuthenticateUseCase
  #noPasswordCheckAuthStrategy: NoPasswordCheckAuthStrategy

  constructor(
    // userProvider: UserProvider,
    ctx: HttpContext,
    authTokenService: AuthTokenServicePort,
    configurationService: ConfigurationServicePort,
    userRepository: UserRepositoryPort,
    publicKeyGetter: PublicKeyGetter,
    openIdPublicJwkGetterStrategy: OpenIdPublicJwkGetterStrategy,
    authenticateUseCase: AuthenticateUseCase,
    noPasswordCheckAuthStrategy: NoPasswordCheckAuthStrategy
  ) {
    this.#ctx = ctx
    this.#authTokenService = authTokenService
    this.#configurationService = configurationService
    this.#userRepository = userRepository
    this.#publicKeyGetter = publicKeyGetter
    this.#openIdPublicJwkGetterStrategy = openIdPublicJwkGetterStrategy
    this.#authenticateUseCase = authenticateUseCase
    this.#noPasswordCheckAuthStrategy = noPasswordCheckAuthStrategy
  }

  /**
   * Generate a JWT token for a given user.
   */
  // async generate(user: UserProvider[typeof symbols.PROVIDER_REAL_USER]) {
  async generate(user: { email: string }) {
    const authResponse = await this.#authenticateUseCase.perform(
      this.#noPasswordCheckAuthStrategy,
      user
    )
    return {
      type: 'bearer',
      token: authResponse.data.accessToken,
    }
  }

  /**
   * Authenticate the current HTTP request and return
   * the user instance if there is a valid JWT token
   * or throw an exception
   */
  // async authenticate(): Promise<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {
  async authenticate(): Promise<TUserDto> {
    /**
     * Avoid re-authentication when it has been done already
     * for the given request
     */
    if (this.authenticationAttempted) {
      return this.getUserOrFail()
    }
    this.authenticationAttempted = true

    /**
     * Ensure the auth header exists
     */
    const authHeader = this.#ctx.request.header('authorization')
    if (!authHeader) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Split the header value and read the token from it
     */
    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Get Public Key
     */

    const publicKeyInstance = await this.#publicKeyGetter.get(this.#openIdPublicJwkGetterStrategy, {
      rawJwt: token,
    })
    const publicKey: string = publicKeyInstance.pem

    /**
     * Verify token
     */
    const verifyOptions = {
      algorithms: this.#configurationService.get('jwt.verify.authorizedAlgorithms'),
      audience: this.#configurationService.get('jwt.verify.authorizedAudiences'),
      issuer: this.#configurationService.get('jwt.verify.authorizedIssuers'),
      ignoreExpiration: false,
    }
    const payload = this.#authTokenService.verify(token, publicKey, verifyOptions)
    if (!payload) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }
    if (typeof payload !== 'object' || !payload.sub) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    /**
     * Fetch the user by user ID and save a reference to it
     */
    const providerUser = await this.#userRepository.getUserById(payload.sub)
    if (!providerUser) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    this.isAuthenticated = true
    this.user = providerUser as TUserDto
    return this.getUserOrFail()
  }

  /**
   * Same as authenticate, but does not throw an exception
   */
  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch (error) {
      if (error instanceof errors.E_UNAUTHORIZED_ACCESS) {
        return false
      }

      throw error
    }
  }

  /**
   * Returns the authenticated user or throws an error
   */
  // getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
  getUserOrFail(): TUserDto {
    if (!this.user) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }
    return this.user
  }

  /**
   * This method is called by Japa during testing when "loginAs"
   * method is used to login the user.
   */
  async authenticateAsClient(
    // user: UserProvider[typeof symbols.PROVIDER_REAL_USER]
    user: TUserDto
  ): Promise<AuthClientResponse> {
    const token = await this.generate(user)
    return {
      headers: {
        authorization: `${token.type} ${token.token}`,
      },
    }
  }
}
