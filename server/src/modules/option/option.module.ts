import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '@/core/file/file.module';
import { Option, OptionSchema } from './schemas/option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Option.name, schema: OptionSchema }]),
    FileModule,
  ],
  providers: [OptionService],
  controllers: [OptionController],
})
export class OptionModule {}
