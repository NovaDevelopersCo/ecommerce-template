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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto, UpdateManufacturerDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Manufacturer } from './schemas/manufacturer.schema';
import { RolesAuthGuard } from '@/auth/guards';
import { Role } from '@/core/enums';
import { PaginationQueryDto } from '@/core/pagination';
import { ReturnPaginationManufacturerDto } from './swagger';
import { ObjectIdValidationPipe } from '@/core/pipes/object-id.validation.pipe';
import { REGEX_FILE_TYPE_IMG } from '@/core/constants';

@ApiTags('manufacturer')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @ApiCreatedResponse({
    type: Manufacturer,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Validation error message' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('logo'))
  @Post()
  create(
    @Body() dto: CreateManufacturerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: REGEX_FILE_TYPE_IMG })],
        fileIsRequired: false,
      }),
    )
    logo?: Express.Multer.File,
  ) {
    return this.manufacturerService.create(dto, logo);
  }

  @ApiOkResponse({
    type: ReturnPaginationManufacturerDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error message' })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.manufacturerService.findAll(query);
  }

  @ApiOkResponse({
    type: Manufacturer,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Validation error message' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.manufacturerService.findOne(id);
  }

  @ApiOkResponse({
    type: Manufacturer,
  })
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Validation error message' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiConsumes('multipart/form-data')
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('logo'))
  @Patch(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: REGEX_FILE_TYPE_IMG })],
        fileIsRequired: false,
      }),
    )
    logo?: Express.Multer.File,
  ) {
    return this.manufacturerService.update(id, updateManufacturerDto, logo);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Validation error message' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiBearerAuth()
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.manufacturerService.remove(id);
  }
}
