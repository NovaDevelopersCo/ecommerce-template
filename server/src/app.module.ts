import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigOptions, MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '@core/file/file.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { ProductModule } from '@modules/product/product.module';
import { CharacteristicModule } from './modules/characteristic/characteristic.module';
import { OptionModule } from './modules/option/option.module';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfigOptions),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    FileModule,
    AuthModule,
    UserModule,
    ProductModule,
    OptionModule,
    CharacteristicModule
  ],
})
export class AppModule {}
