import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Characteristic, CharacteristicGroup } from './schemas';
import { Model } from 'mongoose';
import { CreateCharacteristicsDto, CreateCharacteristicsGroupDto } from './dto/create-characteristic.dto';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectModel(Characteristic.name) private characteristicModel:Model<Characteristic>,
    @InjectModel(CharacteristicGroup.name) private characteristicGroupModel:Model<CharacteristicGroup>
  ) {}

  async create (dto:CreateCharacteristicsDto) {
    const characteristic = await this.characteristicModel.create({
      ...dto
    })
    characteristic.save()
    return characteristic
  }

  async createGroup (dto:CreateCharacteristicsGroupDto) {
    const characteristicGroup = await this.characteristicGroupModel.create({
      ...dto
    })
    console.log(characteristicGroup);
    characteristicGroup.save()
    return characteristicGroup
  }
}