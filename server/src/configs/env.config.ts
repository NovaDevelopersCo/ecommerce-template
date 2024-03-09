import { ConfigModuleOptions } from '@nestjs/config';
import { IsNumber, IsString } from 'class-validator';
import { envValidate } from 'src/core/utils';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  MONGO_URL: string;

  @IsString()
  ACCESS_JWT_SECRET: string;

  @IsString()
  REFRESH_JWT_SECRET: string;


  //Email config
  @IsString()
  MAIL_USER: string;

  @IsString()
  MAIL_PASS: string;

  @IsString()
  MAIL_HOST: string;

  @IsString()
  MAIL_FROM_NAME: string;

  @IsString()
  MAIL_FROM_EMAIL: string;

  //Telegramm config
  @IsString()
  TELEGRAF_API: string;

  @IsString()
  CHAT_ID: string;
}

export const EnvConfigOptions: ConfigModuleOptions = {
  validate: envValidate(EnvironmentVariables),
  isGlobal: true,
};