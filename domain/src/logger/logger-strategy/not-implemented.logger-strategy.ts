import { LoggerStrategy } from './logger-strategy';

export class NotImplementedLoggerStrategy implements LoggerStrategy {
  private static readonly errorMessage =
    'Please register the LoggerManager & a LoggerStrategyFactoryPort to enable logging';

  static log(_message: any, ..._optionalParams: any[]): any {
    console.error(_message, this.errorMessage);
  }

  static error(_message: any, ..._optionalParams: any[]): any {
    console.error(_message, this.errorMessage);
  }

  static warn(_message: any, ..._optionalParams: any[]): any {
    console.error(_message, this.errorMessage);
  }

  static debug(_message: any, ..._optionalParams: any[]): any {
    console.error(_message, this.errorMessage);
  }

  static verbose(_message: any, ..._optionalParams: any[]): any {
    console.error(_message, this.errorMessage);
  }

  static fatal(_message: any, ..._optionalParams: any[]): any {
    console.error(_message, this.errorMessage);
  }

  log(message: any, ...optionalParams: any[]): any {
    return NotImplementedLoggerStrategy.log(message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    return NotImplementedLoggerStrategy.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    return NotImplementedLoggerStrategy.warn(message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): any {
    return NotImplementedLoggerStrategy.debug(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    return NotImplementedLoggerStrategy.verbose(message, optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]): any {
    return NotImplementedLoggerStrategy.fatal(message, optionalParams);
  }
}
