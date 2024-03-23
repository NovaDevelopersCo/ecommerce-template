import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateAlbum {
  @Type(() => Number)
  @IsNumber()
  sort: number;

  @IsString()
  image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAlbum)
  album: UpdateAlbum[];
}
