import { injectable } from '@auth/di';
import { LoggerStrategy, LoggerStrategyFactoryPort } from '@auth/domain';
import { Logger } from '@nestjs/common';

@injectable()
export class LoggerStrategyFactoryNestLoggerAdapter extends LoggerStrategyFactoryPort {
  create(context: string): LoggerStrategy {
    return new Logger(context);
  }
}
