import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
  PaginationProductQuery,
} from './dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Product,
  Characteristic,
  ProductAlbum,
} from './schemas/product.schema';
import { Document, Model } from 'mongoose';
import { FileService } from '@/core/file/file.service';
import * as generateSlug from 'slug';
import { PaginationDto } from '@/core/pagination';
import { TypeReplaceEnum } from '@/core/enums/type-replace.enum';

type TypeProductForSort = Document<unknown, object, Product> &
  Product &
  Required<{ _id: string }>;

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly fileService: FileService,
  ) {}

  async create(
    dto: CreateProductDto,
    image: Express.Multer.File,
    albumFile?: Express.Multer.File[],
  ) {
    const imageUrl = await this.convertAndUpload(image);
    let album: { sort: number; image: string }[];

    if (albumFile) {
      album = await Promise.all(
        albumFile.map(async (file: Express.Multer.File, index: number) => {
          return {
            sort: index,
            image: await this.convertAndUpload(file),
          };
        }),
      );
    }

    const product = await this.productModel.create({
      ...dto,
      image: imageUrl,
      album: album,
    });
    product.slug = generateSlug(product.name + '-' + product._id);
    product.save();
    return product;
  }

  async findAll({ count, page }: PaginationProductQuery) {
    const [products] = await this.productModel.aggregate([
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

    const sortedProducts = this.sort(products.data);
    return new PaginationDto(sortedProducts, products.metadata[0].total, count);
  }

  async findOne(id: string, isSort: boolean = false) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException();
    if (isSort) {
      return this.sort([product])[0];
    }
    return product;
  }

  async update(id: string, dto: UpdateProductDto, image?: Express.Multer.File) {
    const product = await this.findOne(id);
    if (dto.name) dto['slug'] = generateSlug(dto.name + '-' + id);
    if (image) {
      dto['image'] = await this.convertAndUpload(image);
      this.fileService.deleteFile(product.image);
    }
    return this.productModel.findOneAndUpdate(
      { _id: id },
      { ...dto },
      { returnDocument: 'after' },
    );
  }

  async updateAlbumFiles(
    id: string,
    files: Express.Multer.File[],
    type: TypeReplaceEnum = TypeReplaceEnum.ALL,
  ) {
    const product = await this.findOne(id);

    let album;
    if (type === TypeReplaceEnum.ALL) {
      album = await Promise.all(
        files.map(async (file: Express.Multer.File, index: number) => {
          return {
            sort: index,
            image: await this.convertAndUpload(file),
          };
        }),
      );
      await Promise.all(
        product.album.map(
          async (file) => await this.fileService.deleteFile(file.image),
        ),
      );
    }
    if (type === TypeReplaceEnum.ADD_AFTER) {
      const newAlbum = await Promise.all(
        files.map(async (file: Express.Multer.File, index: number) => {
          return {
            sort: index + product.album.length,
            image: await this.convertAndUpload(file),
          };
        }),
      );
      album = [...product.album, ...newAlbum];
    }

    product.album = album;
    return product.save();
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await Promise.all(
      product.album.map(async ({ image }) => {
        await this.fileService.deleteFile(image);
      }),
    );
    await this.fileService.deleteFile(product.image);
    await this.productModel.deleteOne({ _id: id });
  }

  private sort<T extends TypeProductForSort>(products: T[]): T[] {
    const sorted = products.map((product) => {
      product.characteristics = product.characteristics.sort(
        (a: Characteristic, b: Characteristic) =>
          a.sort - b.sort,
      );
      product.album = product.album.sort(
        (a: ProductAlbum, b: ProductAlbum) => a.sort - b.sort,
      );
      return product;
    });

    return sorted;
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
