import { AbstractModel } from '@/core/abstract/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Option } from '@/modules/option/schemas/option.schema';
import { Characteristic } from '@/modules/characteristic/schemas';
import { Manufacturer } from '@/modules/manufacturer/schemas/manufacturer.schema';
export class ProductAlbum {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  sort: number;
}

class ProductCharacteristic {
  @Prop()
  value: string;

  @Prop({ type: Types.ObjectId, ref: Characteristic.name, required: true })
  characteristic: Characteristic;
}

class ProductOption {
  @Prop({ type: Types.ObjectId, ref: Option.name, required: true })
  option: Option;

  @Prop()
  optionValue: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  pricePrefix: string;
}

@Schema()
export class Product extends AbstractModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  slug: string;

  @Prop([String])
  tags: string[];

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: () => [ProductCharacteristic], _id: false })
  characteristics?: ProductCharacteristic[];

  @Prop({ type: () => [ProductAlbum], _id: false })
  album?: ProductAlbum[];

  @Prop({ type: () => [ProductOption], _id: false })
  options?: ProductOption[];

  @Prop({ type: Types.ObjectId, ref: Option.name, required: false })
  manufacturer?: Manufacturer;

  // @Prop()
  // categories: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
