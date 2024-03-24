import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  getTelegramConfig,
  getMailConfig,
  EnvConfigOptions,
  MongooseConfigService,
} from '@config';
import { ProductModule } from '@modules/product/product.module';
import { CharacteristicModule } from '@modules/characteristic/characteristic.module';
import { OptionModule } from '@modules/option/option.module';
import { ManufacturerModule } from '@modules/manufacturer/manufacturer.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@auth/auth.module';
import { FileModule } from '@core/file/file.module';
import { TelegramModule } from '@notification/telegram/telegram.module';
import { MailModule } from '@notification/mail/mail.module';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/file',
    }),
    MailModule,
    AuthModule,
    UserModule,
    ManufacturerModule,
  ],
})
export class AppModule {}
