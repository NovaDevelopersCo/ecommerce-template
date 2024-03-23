import { ApiProperty } from '@nestjs/swagger';

export abstract class ReturnPaginationAbstractDto {
  @ApiProperty({ required: false })
  count: number;

  @ApiProperty({ required: false })
  pageCount: number;
}
