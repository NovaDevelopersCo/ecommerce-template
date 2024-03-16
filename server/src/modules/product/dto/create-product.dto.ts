import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductCharacteristicsDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsNumber()
  sort: number;
}

export class ProductOptionsDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsNumber()
  sort: number;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsMongoId()
  @IsOptional()
  manufacturer?: string;

  @IsNumber()
  isStock: number;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  categories: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCharacteristicsDto)
  characteristics?: ProductCharacteristicsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionsDto)
  options?: ProductOptionsDto[];
}
