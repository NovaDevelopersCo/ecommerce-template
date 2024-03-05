import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigOptions, MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './core/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfigOptions),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    FileModule,
  ],
  providers: [],
})
export class AppModule {}
