import { AbstractModel } from '@/core/abstract/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class ProductAlbum {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  sort: number;
}

class Characteristic {
  @Prop()
  value: string

  @Prop()
  idCarecteristic: string
}

class Options {
  @Prop()
  idOption: string

  @Prop()
  optionValue: string

  @Prop()
  quantity: number

  @Prop()
  price: number

  @Prop()
  pricePrefix:string
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
  stock: number;

  @Prop()
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: () => [Characteristic], _id: false })
  characteristics?: Characteristic[];

  @Prop({ type: () => [ProductAlbum], _id: false })
  album?: ProductAlbum[];

  @Prop({ type: () => [Options], _id: false })
  options?: Options[];

  // @Prop()
  // manufacturer?: string;

  // @Prop()
  // categories: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);