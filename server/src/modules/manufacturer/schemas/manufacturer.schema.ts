import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractModel } from 'src/core/abstract/abstract.schema';

@Schema()
export class Manufacturer extends AbstractModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  // * Url link to website manufacturer
  @Prop()
  link: string;

  @Prop()
  logo: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
