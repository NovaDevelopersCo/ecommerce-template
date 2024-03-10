import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProductCharacteristicDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

class ProductCharacteristicGroupDto {
  @IsString()
  name: string;

  @IsNumber()
  sort: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];
}

// class ProductAlbumDto {
//   @
//   image: string;

//   @IsInt()
//   sort: number;
// }

export class CreateProductDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  tags: string[];

  @Type(() => Boolean)
  @IsBoolean()
  inStock: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCharacteristicGroupDto)
  characteristics: ProductCharacteristicGroupDto[];

  // replace validate ObjectId
  @IsString()
  @IsOptional()
  manufacturer?: string;

  // album: ProductAlbum[];

  @IsArray({ each: true })
  @IsString()
  @IsOptional()
  categories: string[];
}
