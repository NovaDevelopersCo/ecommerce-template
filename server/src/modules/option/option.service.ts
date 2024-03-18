import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Options } from './schemas/options.schema';
import { FileService } from '@/core/file/file.service';
import { CreateOptionsDto } from './dto/create-options.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OptionService {
  constructor (
    @InjectModel(Options.name) private optionModel:Model<Options>,
    private readonly fileService: FileService
  ) {}

  async create (dto:CreateOptionsDto, image:Express.Multer.File = null) {
    const option = await this.optionModel.create({
      ...dto,
      image
    })
    option.save()
    return option
  }
}