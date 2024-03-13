import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductCharacteristicDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class ProductCharacteristicGroupDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  sort: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsMongoId()
  @IsOptional()
  manufacturer?: string;

  @IsBoolean()
  @Transform(({ value }) => value == 'true')
  isStock: boolean;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  categories: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCharacteristicGroupDto)
  characteristics: ProductCharacteristicGroupDto[];
}
