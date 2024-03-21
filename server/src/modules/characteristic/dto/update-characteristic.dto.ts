import { PartialType } from '@nestjs/mapped-types';
import {
  CreateCharacteristicsDto,
  CreateCharacteristicsGroupDto,
} from './create-characteristic.dto';

export class UpdateCharacteristicDto extends PartialType(
  CreateCharacteristicsDto,
) {}

export class UpdateCharacteristicGroupDto extends PartialType(
  CreateCharacteristicsGroupDto,
) {}
