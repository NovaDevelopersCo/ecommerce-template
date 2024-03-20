import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Characteristic, CharacteristicGroup } from './schemas';
import { Model } from 'mongoose';
import { CreateCharacteristicsDto, CreateCharacteristicsGroupDto } from './dto/create-characteristic.dto';
import { PaginationQueryDto } from '@/core/pagination';
import { UpdateCharacteristicDto, UpdateCharacteristicGroupDto } from './dto';

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

  async getAllCharacteristics({count, page}:PaginationQueryDto) {
    return await this.characteristicModel.aggregate([{
      $sort:{
        createdAt: 1
      }
    },
    {
      $facet: {
        metadata: [{$count: 'total'}],
        data: [{$skip: page * count - count}, {$limit: count}]
      }
    }])
  }

  async update (id:string, dto:UpdateCharacteristicDto) {
    return this.characteristicModel.findOneAndUpdate({_id: id}, {...dto}, {returnDocument:'after'})
  }

  async remove (id:string) {
    return this.characteristicModel.deleteOne({_id: id})
  }

  async createGroup (dto:CreateCharacteristicsGroupDto) {
    const characteristicGroup = await this.characteristicGroupModel.create({
      ...dto
    })
    
    characteristicGroup.save()
    return characteristicGroup
  }

  async getAllCharacteristicsGroup({count, page}:PaginationQueryDto) {
    return await this.characteristicGroupModel.aggregate([{
      $sort:{
        createdAt: 1
      }
    },
    {
      $facet: {
        metadata: [{$count: 'total'}],
        data: [{$skip: page * count - count}, {$limit: count}]
      }
    }])
  }

  async updateGroup (id:string, dto:UpdateCharacteristicGroupDto) {
    return this.characteristicGroupModel.findOneAndUpdate({_id: id}, {...dto}, {returnDocument:'after'})
  }

  async removeGroup (id:string) {
    return this.characteristicGroupModel.deleteOne({_id: id})
  }
}