import { ApiProperty } from '@nestjs/swagger';

export abstract class ReturnPaginationAbstractDto {
  @ApiProperty({ required: false, default: 10 })
  count: number;

  @ApiProperty({ required: false, default: 1 })
  pageCount: number;
}
