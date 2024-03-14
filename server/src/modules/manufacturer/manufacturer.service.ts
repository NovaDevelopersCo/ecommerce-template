import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManufacturerDto, UpdateManufacturerDto } from './dto';
import { Manufacturer } from './schemas/manufacturer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileService } from 'src/core/file/file.service';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel(Manufacturer.name)
    private manufacturerModel: Model<Manufacturer>,
    private readonly fileService: FileService,
  ) {}
  async create(dto: CreateManufacturerDto, logo?: Express.Multer.File) {
    if (logo) dto['logo'] = await this.fileService.uploadFile(logo);
    const manufacturer = await this.manufacturerModel.create(dto);
    return manufacturer;
  }

  async findAll() {
    // change later and male with pagination
    const manufacturers = await this.manufacturerModel.find();
    return manufacturers;
  }

  async findOne(id: string) {
    const manufacturer = await this.manufacturerModel.findOne({ _id: id });
    if (!manufacturer) throw new NotFoundException();
    return manufacturer;
  }

  async update(
    id: string,
    dto: UpdateManufacturerDto,
    logo?: Express.Multer.File,
  ) {
    const manufacturer = await this.findOne(id);
    let newLogo = manufacturer.logo;

    if (logo) {
      if (manufacturer.logo) {
        await this.fileService.deleteFile(manufacturer.logo);
      }
      newLogo = await this.fileService.uploadFile(logo);
    }

    return this.manufacturerModel.findOneAndUpdate(
      { _id: id },
      { ...dto, logo: newLogo },
      { returnDocument: 'after' },
    );
  }

  async remove(id: string) {
    const manufacturer = await this.findOne(id);
    if (manufacturer.logo) await this.fileService.deleteFile(manufacturer.logo);
    await this.manufacturerModel.deleteOne({ _id: id });
  }
}
