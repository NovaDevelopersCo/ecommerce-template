import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';


class OptionsTypeDto {
  @IsString()
  valueName: string;

  @IsString()
  image: string;

  @IsNumber()
  sort: number;
}

export class CreateOptionsDto {
  @IsString()
  @IsEmpty()
  name: string;

  @IsString()
  @IsEmpty()
  type: string;

  @IsBoolean()
  required: boolean

  @IsArray()
  @IsEmpty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OptionsTypeDto)
  options?: OptionsTypeDto[];
}
