import { AbstractModel } from '@/core/abstract/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Options } from './options.schema';
import { Types } from 'mongoose';
import { Characteristic } from './characteristic.schema';

export class ProductAlbum {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  sort: number;
}

@Schema()
export class Product extends AbstractModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  slug: string;

  @Prop([String])
  tags: string[];

  @Prop({ default: 0, type: Number })
  isStock: number;

  @Prop()
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Types.ObjectId, ref: Characteristic.name })
  characteristics?: Characteristic;

  @Prop({ type: () => [ProductAlbum], _id: false })
  album?: ProductAlbum[];

  @Prop({ type: Types.ObjectId, ref: Options.name })
  option?: Options;

  // @Prop()
  // manufacturer?: string;

  // @Prop()
  // categories: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export { Characteristic };

