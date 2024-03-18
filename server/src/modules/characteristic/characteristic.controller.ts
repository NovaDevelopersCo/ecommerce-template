import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { RolesAuthGuard } from '@/auth/guards';
import { Role } from '@/core/enums';
import { CreateCharacteristicsDto, CreateCharacteristicsGroupDto } from './dto/create-characteristic.dto';

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

  @HttpCode(HttpStatus.CREATED)
  @Post('group')
  @UsePipes(new ValidationPipe())
  @RolesAuthGuard(Role.ADMIN)
  createGroup (@Body() dto: CreateCharacteristicsGroupDto) {
    return this.caracteristicService.createGroup(dto);
  }
}