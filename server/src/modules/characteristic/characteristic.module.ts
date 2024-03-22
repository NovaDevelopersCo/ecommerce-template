import { Module } from '@nestjs/common';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Characteristic,
  CharacteristicGroup,
  CharacteristicGroupSchema,
  CharacteristicSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Characteristic.name, schema: CharacteristicSchema },
      { name: CharacteristicGroup.name, schema: CharacteristicGroupSchema },
    ]),
  ],
  providers: [CharacteristicService],
  controllers: [CharacteristicController],
})
export class CharacteristicModule {}
