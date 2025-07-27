import { InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariablesDto } from '@auth/domain';

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariablesDto, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    console.error(
      errors.map(({ property, value, constraints }) => {
        return {
          property,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value,
          constraints,
        };
      }),
    );
    throw new InternalServerErrorException('Bad environment variables');
  }
  return validatedConfig;
}
