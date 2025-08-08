import { injectable } from '@auth/di';
import {
  LoggerService,
  LoggerStrategyFactoryPort,
  NotImplementedLoggerStrategy,
} from '@auth/domain';

@injectable()
export class LoggerManager {
  private static loggerStrategyFactory?: LoggerStrategyFactoryPort;

  constructor(
    private readonly loggerStrategyFactory: LoggerStrategyFactoryPort,
  ) {
    LoggerManager.loggerStrategyFactory = loggerStrategyFactory;
  }

  static createLogger(context: string) {
    if (this.loggerStrategyFactory) {
      return new LoggerService(this.loggerStrategyFactory.create(context));
    }
    const logger = new LoggerService(NotImplementedLoggerStrategy);
    logger.log(`${context} : `);
    return logger;
  }

  createLogger(context: string) {
    return this.loggerStrategyFactory.create(context);
  }
}
