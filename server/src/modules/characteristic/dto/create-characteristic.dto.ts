import { IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreateCharacteristicsDto {
  @IsMongoId()
  @IsString()
  groupId: string;

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
