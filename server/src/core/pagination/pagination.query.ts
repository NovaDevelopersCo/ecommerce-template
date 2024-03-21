import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  count: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;
}
