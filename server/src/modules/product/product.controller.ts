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
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  PaginationProductQuery,
  UpdateProductDto,
  UploadAlbumDto,
} from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { FileFieldsValidator } from '@core/validators';
import { FILE_WITH_IMAGE_IS_REQUIRED, FILE_IS_REQUIRED } from './constants';
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

  @ApiOkResponse({
    type: CreateProduct,
    description: `Server responce after created product`,
  })
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'album', maxCount: 10 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  @Post()
  create(
    @Body() dto: CreateProductDto,
    @UploadedFiles({
      transform: new FileFieldsValidator(/\/(jpg|jpeg|png|webp)$/).transform,
    })
    files: { album?: Express.Multer.File[]; image: Express.Multer.File[] },
  ) {
    if (!files.image || !files.image.length) {
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
    return this.productService.findOne(id);
  }

  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /\/(jpg|jpeg|png|webp)$/,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return this.productService.update(id, dto, file);
  }

  @RolesAuthGuard(Role.ADMIN)
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
    if (!files || !files.album.length) {
      throw new BadRequestException(FILE_IS_REQUIRED);
    }
    return this.productService.updateAlbumFiles(id, files.album, type);
  }

  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.productService.remove(id);
  }
}
