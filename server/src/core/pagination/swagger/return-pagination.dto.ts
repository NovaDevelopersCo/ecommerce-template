import { ApiProperty } from '@nestjs/swagger';

export abstract class ReturnPaginationAbstractDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  pageCount: number;
}
