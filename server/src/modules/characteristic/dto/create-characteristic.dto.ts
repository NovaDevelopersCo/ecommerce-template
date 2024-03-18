import { IsString, IsNumber, IsOptional, IsEmpty, IsNotEmpty } from "class-validator";

export class CreateCharacteristicsDto {
  @IsString()
  idGroup: string;

  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  sort: number;
}

export class CreateCharacteristicsGroupDto {
  @IsString()
  name: string;
  
  @IsNumber()
  @IsOptional()
  sort: number;
}