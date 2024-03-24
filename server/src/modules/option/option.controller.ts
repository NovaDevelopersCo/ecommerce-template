import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { RolesAuthGuard } from '@/auth/guards';
import { Role } from '@/core/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateOptionsDto } from './dto/create-options.dto';
import { ObjectIdValidationPipe } from '@/core/pipes/object-id.validation.pipe';
import { PaginationQueryDto } from '@/core/pagination';
import { UpdateOptionsDto } from './dto';
import { REGEX_FILE_TYPE_IMG } from '@/core/constants';

@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() dto: CreateOptionsDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: REGEX_FILE_TYPE_IMG,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return this.optionService.create(dto, file);
  }
  // * Checked
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.optionService.findAll(query);
  }

  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateOptionsDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: REGEX_FILE_TYPE_IMG,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return this.optionService.update(id, dto, file);
  }

  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.optionService.remove(id);
  }
}
