import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OptionService } from './option.service';
import { RolesAuthGuard } from '@/auth/guards';
import { Role } from '@/core/enums';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateOptionsDto } from './dto/create-options.dto';
import { FileFieldsValidator } from '@/core/validators';

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
}