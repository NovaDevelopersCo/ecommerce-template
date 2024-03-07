import { ConfigModuleOptions } from '@nestjs/config';
import { IsNumber, IsString } from 'class-validator';
import { envValidate } from '@core/utils';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  MONGO_URL: string;

  @IsString()
  ACCESS_JWT_SECRET: string;

  @IsString()
  REFRESH_JWT_SECRET: string;
}

export const EnvConfigOptions: ConfigModuleOptions = {
  validate: envValidate(EnvironmentVariables),
  isGlobal: true,
};
