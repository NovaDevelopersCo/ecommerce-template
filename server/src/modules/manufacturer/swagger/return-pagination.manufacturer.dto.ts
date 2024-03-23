import { ReturnPaginationAbstractDto } from '@/core/pagination/swagger';
import { Manufacturer } from '../schemas/manufacturer.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnPaginationManufacturerDto extends ReturnPaginationAbstractDto {
  @ApiProperty({ type: [Manufacturer] })
  items: Manufacturer[];
}
