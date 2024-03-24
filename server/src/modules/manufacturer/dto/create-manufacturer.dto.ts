import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateManufacturerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    required: false,
    description: 'Url link to website manufacturer',
  })
  @IsOptional()
  @IsUrl()
  link: string;

  // * File upload
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'file type should be jpeg | png | jpg | webp',
  })
  logo?: unknown;
}
