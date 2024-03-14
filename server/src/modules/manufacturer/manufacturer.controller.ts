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

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('logo'))
  @Post()
  create(
    @Body() dto: CreateManufacturerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\/(jpg|jpeg|png)$/ })],
        fileIsRequired: false,
      }),
    )
    logo?: Express.Multer.File,
  ) {
    return this.manufacturerService.create(dto, logo);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.manufacturerService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(id);
  }

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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(id);
  }
}
