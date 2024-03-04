import { ConfigModuleOptions } from '@nestjs/config';
import { IsNumber } from 'class-validator';
import { envValidate } from 'src/core/utils';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;
}

export const EnvConfigOptions: ConfigModuleOptions = {
  validate: envValidate(EnvironmentVariables),
  isGlobal: true,
};
