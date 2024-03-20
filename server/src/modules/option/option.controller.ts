import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OptionService } from './option.service';
import { RolesAuthGuard } from '@/auth/guards';
import { Role } from '@/core/enums';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateOptionsDto } from './dto/create-options.dto';
import { FileFieldsValidator } from '@/core/validators';
import { ObjectIdValidationPipe } from '@/core/pipes/object-id.validation.pipe';
import { PaginationQueryDto } from '@/core/pagination';
import { UpdateOptionsDto } from './dto';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'album', maxCount: 10 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  @Post()
  @RolesAuthGuard(Role.ADMIN)
  create (
    @Body() dto: CreateOptionsDto,
    @UploadedFile({
      transform: new FileFieldsValidator(/\/(jpg|jpeg|png)$/).transform,
    })
    file: { image?: Express.Multer.File }
  ) {
    if (file) {
      return this.optionService.create(dto, file.image);
    }
    return this.optionService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.optionService.findAll(query);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Patch(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateOptionsDto,
    @UploadedFile({
      transform: new FileFieldsValidator(/\/(jpg|jpeg|png)$/).transform,
    })
    file: {image?: Express.Multer.File},
  ){
    return this.optionService.update(id, dto, file.image);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.optionService.remove(id);
  }
}