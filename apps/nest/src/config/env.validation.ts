import { EnvironmentVariablesDto } from '@auth/domain';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import {
  flattenValidationErrors,
  ValidationService,
} from '../core/validation/validation.service';

const logger = new Logger('EnvValidator');

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariablesDto,
    config,
    ValidationService.getClassSerializerInterceptorOptions(),
  );
  const errors = validateSync(
    validatedConfig,
    ValidationService.getValidationPipeOptions(),
  );

  if (errors.length > 0) {
    const errorsForResponse = flattenValidationErrors(errors);
    logger.error(errorsForResponse);
    throw new InternalServerErrorException('Bad environment variables');
  }
  return validatedConfig;
}
