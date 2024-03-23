import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  count: number = 10;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;
}
