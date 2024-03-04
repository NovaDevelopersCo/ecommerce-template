import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigOptions, MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfigOptions),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
  providers: [],
})
export class AppModule {}
