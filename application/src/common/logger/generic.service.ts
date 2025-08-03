import { LoggerManager } from './logger.manager';

export abstract class GenericService {
  protected logger = LoggerManager.createLogger(this.constructor.name);
}
