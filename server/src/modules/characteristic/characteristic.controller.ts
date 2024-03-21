import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { RolesAuthGuard } from '@/auth/guards';
import { Role } from '@/core/enums';
import {
  CreateCharacteristicsDto,
  CreateCharacteristicsGroupDto,
  UpdateCharacteristicGroupDto,
} from './dto';
import { ObjectIdValidationPipe } from '@/core/pipes/object-id.validation.pipe';
import { PaginationQueryDto } from '@/core/pagination';
import { UpdateCharacteristicDto } from './dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('characteristic')
export class CharacteristicController {
  constructor(private readonly characteristicService: CharacteristicService) {}

  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateCharacteristicsDto) {
    return this.characteristicService.create(dto);
  }

  // * Checked
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.characteristicService.getAllCharacteristics(query);
  }
  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateCharacteristicDto,
  ) {
    return this.characteristicService.update(id, dto);
  }

  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.characteristicService.remove(id);
  }

  // * group:

  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('group')
  createGroup(@Body() dto: CreateCharacteristicsGroupDto) {
    return this.characteristicService.createGroup(dto);
  }

  // * Checked
  @HttpCode(HttpStatus.OK)
  @Get('group')
  findAllGroup(@Query() query: PaginationQueryDto) {
    return this.characteristicService.getAllCharacteristicsGroup(query);
  }

  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Patch('group/:id')
  updateGroup(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateCharacteristicGroupDto,
  ) {
    return this.characteristicService.updateGroup(id, dto);
  }

  // * Checked
  @RolesAuthGuard(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('group/:id')
  removeGroup(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.characteristicService.removeGroup(id);
  }
}
