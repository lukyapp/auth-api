import { LoggerStrategy } from './logger-strategy/logger-strategy';

export abstract class LoggerStrategyFactoryPort {
  abstract create(context: string): LoggerStrategy;
}
