import {
  ConfigurationServicePort,
  EnvironmentVariablesDto,
} from '@auth/domain';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationServiceEnvAdapter
  extends ConfigService<EnvironmentVariablesDto, true>
  implements ConfigurationServicePort {}
