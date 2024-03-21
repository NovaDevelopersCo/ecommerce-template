import { Type } from 'class-transformer';
import {
  IsArray,
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class OptionsTypeDto {
  @IsString()
  valueName: string;

  @IsOptional()
  @IsString()
  image: string;

  @Type(() => Number)
  @IsNumber()
  sort: number;
}

export class CreateOptionsDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsBooleanString()
  required: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OptionsTypeDto)
  options?: OptionsTypeDto[];
}
