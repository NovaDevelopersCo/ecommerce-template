import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto, UpdateManufacturerDto } from './dto';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Manufacturer } from './schemas/manufacturer.schema';

@ApiTags('manufacturer')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @ApiCreatedResponse({
    type: Manufacturer,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('logo'))
  @Post()
  create(
    @Body() dto: CreateManufacturerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /\/(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    logo?: Express.Multer.File,
  ) {
    return this.manufacturerService.create(dto, logo);
  }

  // TODO: add later
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.manufacturerService.findAll();
  }

  @ApiOkResponse({
    type: Manufacturer,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(id);
  }

  @ApiOkResponse({
    type: Manufacturer,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('logo'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\/(jpg|jpeg|png)$/ })],
        fileIsRequired: false,
      }),
    )
    logo?: Express.Multer.File,
  ) {
    return this.manufacturerService.update(id, updateManufacturerDto, logo);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiNoContentResponse({ description: 'No content' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(id);
  }
}
