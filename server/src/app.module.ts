import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfigOptions, MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '@modules/product/product.module';
import { CharacteristicModule } from './modules/characteristic/characteristic.module';
import { OptionModule } from './modules/option/option.module';
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
    ProductModule,
    OptionModule,
    CharacteristicModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
  ],
})
export class AppModule {}
