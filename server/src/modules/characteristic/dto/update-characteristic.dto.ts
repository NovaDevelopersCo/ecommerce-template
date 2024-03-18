import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacteristicsDto } from './create-characteristic.dto';

export class UpdateOptionsDto extends PartialType(CreateCharacteristicsDto) {}