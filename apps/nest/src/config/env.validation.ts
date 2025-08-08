import { ValidationService } from '@auth/application';
import { EnvironmentVariablesDto } from '@auth/domain';
import { InternalServerErrorException } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { plainToInstance } from '@auth/validation';
import { validateSync } from '@auth/validation';

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
    const errorsForResponse = ValidationService.flattenValidationErrors(errors);
    logger.error(errorsForResponse);
    throw new InternalServerErrorException('Bad environment variables');
  }
  return validatedConfig;
}
