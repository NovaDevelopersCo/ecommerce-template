import { AbstractModel } from '@/core/abstract/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class OptionsType {
  @Prop({ required: true })
  valueName: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  sort: number;
}

@Schema()
export class Options extends AbstractModel {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop({ default: 0 })
  sort: number;

  @Prop({default: false})
  required: boolean

  @Prop({default: null})
  image?: string

  @Prop({ type: () => [OptionsType], _id: true })
  options?: OptionsType[];
}

export const OptionsSchema = SchemaFactory.createForClass(Options);
