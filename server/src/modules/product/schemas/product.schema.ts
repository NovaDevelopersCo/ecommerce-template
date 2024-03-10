import { AbstractModel } from '@/core/abstract/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class ProductCharacteristic {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;
}

class ProductCharacteristicGroup {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  sort: number;

  @Prop({ type: () => [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[];
}

class ProductAlbum {
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

  @Prop({ required: true })
  inStock: true;

  @Prop()
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: () => [ProductCharacteristicGroup], _id: false })
  characteristics: ProductCharacteristicGroup[];

  @Prop({ type: () => [ProductAlbum], _id: false })
  album: ProductAlbum[];

  // @Prop()
  // manufacturer?: string;

  // @Prop()
  // categories: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
