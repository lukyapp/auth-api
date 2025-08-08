import {
  ConfigurationServicePort,
  EnvironmentVariablesDto,
} from '@auth/domain';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '../core/di/injectable.decorator';

@Injectable()
export class ConfigurationServiceEnvAdapter
  extends ConfigService<EnvironmentVariablesDto, true>
  implements ConfigurationServicePort {}
