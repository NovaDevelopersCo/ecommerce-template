import { AbstractModel } from '@/core/abstract/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class OptionType {
  @Prop({ required: true })
  valueName: string;

  @Prop()
  image?: string;

  @Prop({ default: 0 })
  sort: number;
}

@Schema()
export class Option extends AbstractModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop({ default: 0 })
  sort: number;

  @Prop({ default: false })
  required: boolean;

  @Prop({ default: null })
  image?: string;

  @Prop({ type: [OptionType], _id: false })
  options?: OptionType[];
}

export const OptionSchema = SchemaFactory.createForClass(Option);
