import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Characteristic, CharacteristicGroup } from './schemas';
import { Model } from 'mongoose';
import {
  CreateCharacteristicsDto,
  CreateCharacteristicsGroupDto,
} from './dto/create-characteristic.dto';
import { PaginationDto, PaginationQueryDto } from '@/core/pagination';
import { UpdateCharacteristicDto, UpdateCharacteristicGroupDto } from './dto';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectModel(Characteristic.name)
    private characteristicModel: Model<Characteristic>,
    @InjectModel(CharacteristicGroup.name)
    private characteristicGroupModel: Model<CharacteristicGroup>,
  ) {}

  async create(dto: CreateCharacteristicsDto) {
    const characteristic = await this.characteristicModel.create({
      ...dto,
      group: dto.groupId,
    });
    return characteristic;
  }

  async getAllCharacteristics({ count, page }: PaginationQueryDto) {
    const [aggregateData] = await this.characteristicModel.aggregate([
      {
        $addFields: {
          group: { $toObjectId: '$group' },
          groupId: '$group',
        },
      },
      {
        $lookup: {
          from: CharacteristicGroup.name,
          localField: 'group',
          foreignField: '_id',
          as: 'group',
        },
      },
      { $unwind: { path: '$group' } },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: page * count - count }, { $limit: count }],
        },
      },
    ]);
    const { metadata, data } = aggregateData;
    if (!metadata || !metadata.length) {
      return new PaginationDto([], 0, count);
    }
    return new PaginationDto(data, metadata[0].total, count);
  }

  async findOneCharacteristic(id: string) {
    const characteristic = await this.characteristicModel.findById(id);
    if (!characteristic) throw new NotFoundException();
    return characteristic;
  }

  async findOneCharacteristicGroup(id: string) {
    const charGroup = await this.characteristicGroupModel.findById(id);
    if (!charGroup) throw new NotFoundException();
    return charGroup;
  }

  async update(id: string, dto: UpdateCharacteristicDto) {
    await this.findOneCharacteristic(id);
    return this.characteristicModel.findOneAndUpdate(
      { _id: id },
      { ...dto },
      { returnDocument: 'after' },
    );
  }

  async remove(id: string) {
    await this.findOneCharacteristic(id);
    return this.characteristicModel.deleteOne({ _id: id });
  }

  async createGroup(dto: CreateCharacteristicsGroupDto) {
    const charGroup = await this.characteristicGroupModel.create(dto);
    return charGroup;
  }

  async getAllCharacteristicsGroup({ count, page }: PaginationQueryDto) {
    const [aggregateData] = await this.characteristicGroupModel.aggregate([
      {
        $sort: {
          sort: 1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: page * count - count }, { $limit: count }],
        },
      },
    ]);
    const { metadata, data } = aggregateData;
    if (!metadata || !metadata.length) {
      return new PaginationDto([], 0, count);
    }
    return new PaginationDto(data, metadata[0].total, count);
  }

  async updateGroup(id: string, dto: UpdateCharacteristicGroupDto) {
    await this.findOneCharacteristicGroup(id);
    return this.characteristicGroupModel.findOneAndUpdate(
      { _id: id },
      { ...dto },
      { returnDocument: 'after' },
    );
  }

  async removeGroup(id: string) {
    await this.findOneCharacteristicGroup(id);
    return this.characteristicGroupModel.deleteOne({ _id: id });
  }
}
