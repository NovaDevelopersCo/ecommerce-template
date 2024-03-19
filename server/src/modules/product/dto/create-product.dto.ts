import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCharacteristicsDto {
  @ApiProperty({required:false})
  @IsString()
  idCaracteristic: string

  @ApiProperty({required:false})
  @IsString()
  value:string
}

class CreateOptionsDto {
  @ApiProperty({required:false})
  @IsString()
  idOption: string

  @ApiProperty({required:false})
  @IsString()
  optionValue: string

  @ApiProperty({required:false})
  @IsNumber()
  quantity: number

  @ApiProperty({required:false})
  @IsNumber()
  price: number

  @ApiProperty({required:false})
  @IsString()
  pricePrefix:string
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  manufacturer?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @ApiProperty({required:false})
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  categories: string[];

  @ApiProperty({type:CreateCharacteristicsDto, isArray:true, required:false})
  @IsOptional()
  @IsArray()
  //@ValidateNested({ each: true })
  @Type(() => CreateCharacteristicsDto)
  characteristics?: CreateCharacteristicsDto[];

  @ApiProperty({type:CreateOptionsDto, isArray:true, required: false})
  @IsOptional()
  @IsArray()
  @Type(() => CreateOptionsDto)
  options?: CreateOptionsDto[];
}
