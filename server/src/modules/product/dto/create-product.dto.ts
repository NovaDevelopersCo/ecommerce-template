import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateCharacteristicsDto {
  @IsString()
  idCaracteristic: string

  @IsString()
  value:string
}

class CreateOptionsDto {
  @IsString()
  idOption: string

  @IsString()
  optionValue: string

  @IsNumber()
  quantity: number

  @IsNumber()
  price: number

  @IsString()
  pricePrefix:string
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsMongoId()
  @IsOptional()
  manufacturer?: string;

  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  categories: string[];

  @IsOptional()
  @IsArray()
  //@ValidateNested({ each: true })
  @Type(() => CreateCharacteristicsDto)
  characteristics?: CreateCharacteristicsDto[];

  @IsOptional()
  @IsArray()
  @Type(() => CreateOptionsDto)
  options?: CreateOptionsDto[];
}
