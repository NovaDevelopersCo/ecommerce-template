import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractModel } from 'src/core/abstract/abstract.schema';

@Schema()
export class Manufacturer extends AbstractModel {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty({ required: false })
  @Prop()
  description?: string;

  @ApiProperty({
    required: false,
    description: 'Url link to website manufacturer',
  })
  @Prop()
  link?: string;

  @ApiProperty({ required: false, description: 'Img link' })
  @Prop()
  logo?: string;

  // *
  //* products:
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
