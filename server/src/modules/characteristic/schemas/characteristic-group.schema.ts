import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CharacteristicGroup {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  sort: number;
}

export const CharacteristicGroupSchema =
  SchemaFactory.createForClass(CharacteristicGroup);
