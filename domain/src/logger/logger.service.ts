import { LoggerStrategy } from './logger-strategy/logger-strategy';

export class LoggerService implements LoggerStrategy {
  constructor(private readonly loggerStrategy: LoggerStrategy) {}

  static log(
    loggerStrategy: LoggerStrategy,
    message: any,
    ...optionalParams: any[]
  ): any {
    return loggerStrategy.log(message, ...optionalParams);
  }

  static error(
    loggerStrategy: LoggerStrategy,
    message: any,
    ...optionalParams: any[]
  ): any {
    return loggerStrategy.error(message, ...optionalParams);
  }

  static warn(
    loggerStrategy: LoggerStrategy,
    message: any,
    ...optionalParams: any[]
  ): any {
    return loggerStrategy.warn(message, ...optionalParams);
  }

  static debug(
    loggerStrategy: LoggerStrategy,
    message: any,
    ...optionalParams: any[]
  ): any {
    return loggerStrategy.debug?.(message, ...optionalParams);
  }

  static verbose(
    loggerStrategy: LoggerStrategy,
    message: any,
    ...optionalParams: any[]
  ): any {
    return loggerStrategy.verbose?.(message, ...optionalParams);
  }

  static fatal(
    loggerStrategy: LoggerStrategy,
    message: any,
    ...optionalParams: any[]
  ): any {
    return loggerStrategy.fatal?.(message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    return LoggerService.log(this.loggerStrategy, message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    return LoggerService.error(this.loggerStrategy, message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    return LoggerService.warn(this.loggerStrategy, message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): any {
    return LoggerService.debug(this.loggerStrategy, message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    return LoggerService.verbose(
      this.loggerStrategy,
      message,
      ...optionalParams,
    );
  }

  fatal(message: any, ...optionalParams: any[]): any {
    return LoggerService.fatal(this.loggerStrategy, message, ...optionalParams);
  }
}
