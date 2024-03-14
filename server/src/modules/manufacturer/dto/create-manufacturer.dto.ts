import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  link: string;
}
