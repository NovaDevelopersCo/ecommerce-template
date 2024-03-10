import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
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
  name: string;

  @IsString()
  type: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionsTypeDto)
  characteristics: OptionsTypeDto[];
}
