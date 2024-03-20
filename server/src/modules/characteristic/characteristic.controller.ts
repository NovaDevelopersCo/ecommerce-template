import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { RolesAuthGuard } from '@/auth/guards';
import { Role } from '@/core/enums';
import { CreateCharacteristicsDto, CreateCharacteristicsGroupDto, UpdateCharacteristicGroupDto } from './dto';
import { ObjectIdValidationPipe } from '@/core/pipes/object-id.validation.pipe';
import { PaginationQueryDto } from '@/core/pagination';
import { UpdateCharacteristicDto } from './dto';

@Controller('characteristic')
export class CharacteristicController {
  constructor(private readonly caracteristicService: CharacteristicService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(new ValidationPipe())
  @RolesAuthGuard(Role.ADMIN)
  create (@Body() dto: CreateCharacteristicsDto) {
    return this.caracteristicService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query:PaginationQueryDto) {
    return this.caracteristicService.getAllCharacteristics(query);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateCharacteristicDto
  ) {
    return this.caracteristicService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.caracteristicService.remove(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('group')
  @UsePipes(new ValidationPipe())
  @RolesAuthGuard(Role.ADMIN)
  createGroup (@Body() dto: CreateCharacteristicsGroupDto) {
    return this.caracteristicService.createGroup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('group')
  findAllGroup(@Query() query:PaginationQueryDto) {
    return this.caracteristicService.getAllCharacteristicsGroup(query);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('group/:id')
  updateGroup(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() dto: UpdateCharacteristicGroupDto
  ) {
    return this.caracteristicService.updateGroup(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('group/:id')
  removeGroup(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.caracteristicService.removeGroup(id);
  }
}