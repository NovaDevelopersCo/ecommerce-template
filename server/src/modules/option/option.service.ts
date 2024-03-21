import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Options } from './schemas/options.schema';
import { FileService } from '@/core/file/file.service';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto, PaginationQueryDto } from '@/core/pagination';
import { UpdateOptionsDto, CreateOptionsDto } from './dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Options.name) private optionModel: Model<Options>,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateOptionsDto, image?: Express.Multer.File) {
    if (image) {
      dto['image'] = await this.convertAndUpload(image);
    }
    const option = await this.optionModel.create({
      ...dto,
    });
    return option;
  }

  async findAll({ count, page }: PaginationQueryDto) {
    const [{ metadata, data }] = await this.optionModel.aggregate([
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: page * count - count }, { $limit: count }],
        },
      },
    ]);
    return new PaginationDto(data, metadata[0].total, count);
  }

  // * new
  async findOne(id: string) {
    const option = await this.optionModel.findById(id);
    if (!option) throw new NotFoundException();
    return option;
  }

  async update(id: string, dto: UpdateOptionsDto, image?: Express.Multer.File) {
    const option = await this.findOne(id);
    console.log(dto);
    if (image) {
      dto['image'] = await this.convertAndUpload(image);
      this.fileService.deleteFile(option.image);
    }
    return this.optionModel.findOneAndUpdate(
      { _id: id },
      { ...dto },
      { returnDocument: 'after' },
    );
  }

  async remove(id: string) {
    const option = await this.findOne(id);
    if (option.image) this.fileService.deleteFile(option.image);
    await this.optionModel.deleteOne({ _id: id });
  }

  private async convertAndUpload(file: Express.Multer.File) {
    const buffer = await this.fileService.convertToWebp(file.buffer);
    return await this.fileService.uploadFile({
      ...file,
      buffer,
      mimetype: 'image/webp',
    });
  }
}
