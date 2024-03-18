import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionsDto } from './create-options.dto';

export class UpdateOptionsDto extends PartialType(CreateOptionsDto) {}
