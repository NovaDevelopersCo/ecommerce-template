import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UploadedFiles,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  PaginationProductQuery,
  UpdateProductDto,
  UploadAlbumDto,
} from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileFieldsValidator } from '@core/validators';
import { FILE_IS_REQUIRED, FILE_WITH_IMAGE_IS_REQUIRED } from './constants';
import { ObjectIdValidationPipe } from '@/core/pipes/object-id.validation.pipe';
import { RolesAuthGuard } from '@/auth/guards';
import { Role } from '@/core/enums';
import { CreateProduct } from './swagger';

@ApiTags('product')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'album', maxCount: 10 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  @ApiOkResponse({
    type: CreateProduct,
    description: `Server responce after created product`,
  })
  @Post()
  @RolesAuthGuard(Role.ADMIN)
  create(
    @Body() dto: CreateProductDto,
    @UploadedFiles({
      transform: new FileFieldsValidator(/\/(jpg|jpeg|png)$/).transform,
    })
    files: { album?: Express.Multer.File[]; image: Express.Multer.File[] },
  ) {
    if (!files.image || !files.image.length){
      throw new BadRequestException(FILE_WITH_IMAGE_IS_REQUIRED);
    }

    return this.productService.create(dto, files.image[0], files.album);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: PaginationProductQuery) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.productService.findOne(id, true);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Patch(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFiles({
      transform: new FileFieldsValidator(/\/(jpg|jpeg|png)$/).transform,
    })
    files: {
      image?: Express.Multer.File[];
    },
  ) {
    let file;
    if (files?.image) {
      file = files?.image[0];
    }
    console.log(dto, 'st');
    return this.productService.update(id, dto, file);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'album', maxCount: 10 }]))
  @Patch('album/:id')
  uploadAlbumFiles(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() { type }: UploadAlbumDto,
    @UploadedFiles({
      transform: new FileFieldsValidator(/\/(jpg|jpeg|png)$/).transform,
    })
    files: { album: Express.Multer.File[] },
  ) {
    if (!files || !files.album.length)
      throw new BadRequestException(FILE_IS_REQUIRED);
    return this.productService.updateAlbumFiles(id, files.album, type);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.productService.remove(id);
  }
}
