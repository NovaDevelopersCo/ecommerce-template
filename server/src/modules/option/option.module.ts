import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '@/core/file/file.module';
import { Options, OptionsSchema } from './schemas/options.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Options.name, schema: OptionsSchema }]),
    FileModule,
  ],
  providers: [OptionService],
  controllers: [OptionController],
})
export class OptionModule {}
