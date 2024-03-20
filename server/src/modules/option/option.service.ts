import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Options } from './schemas/options.schema';
import { FileService } from '@/core/file/file.service';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationQueryDto } from '@/core/pagination';
import { UpdateOptionsDto, CreateOptionsDto } from './dto';

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

  async findAll({ count, page }: PaginationQueryDto) {
    return await this.optionModel.aggregate([
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

    //const sortedProducts = this.sort(products.data);
    //return new PaginationDto(sortedProducts, products.metadata[0].total, count);
  }

  async update(id: string, dto: UpdateOptionsDto, image?: Express.Multer.File) {
    const option = await this.optionModel.findById(id);
    if (image) {
      const buffer = await this.fileService.convertToWebp(image.buffer);
      dto['image'] = await this.fileService.uploadFile({
        ...image,
        buffer,
        mimetype: 'image/webp',
      });

      this.fileService.deleteFile(option.image);
    }
    return this.optionModel.findOneAndUpdate(
      { _id: id },
      { ...dto },
      { returnDocument: 'after' },
    );
  }

  async remove(id: string) {
    const option = await this.optionModel.findById(id);
    await this.fileService.deleteFile(option.image);
    await this.optionModel.deleteOne({ _id: id });
  }
}