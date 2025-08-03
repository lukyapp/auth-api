import { inject } from '@adonisjs/core'
import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { ExceptionsHandler } from '@auth/application'

@inject()
export default class HttpExceptionHandler extends ExceptionHandler {
  constructor(private readonly exceptionsHandler: ExceptionsHandler) {
    super()
  }

  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(unknownException: unknown, ctx: HttpContext) {
    const exception = this.exceptionsHandler.handle(unknownException)
    return ctx.response.status(exception.getStatus()).send(exception.getResponseBody())
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
