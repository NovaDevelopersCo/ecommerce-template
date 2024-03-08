import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfigOptions, MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './core/file/file.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { getMailConfig } from './configs/mail.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TelegramModule } from './notification/telegram/telegram.module';
import { getTelegramConfig } from './configs/telegram.config';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfigOptions),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
    FileModule,
    AuthModule,
    UserModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useFactory: getTelegramConfig
    }),
  ],
})
export class AppModule {}
