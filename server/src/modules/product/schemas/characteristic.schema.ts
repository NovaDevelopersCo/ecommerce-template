import { Prop, SchemaFactory } from "@nestjs/mongoose";

class CharacteristicValues {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;
}

export class Characteristic {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  sort: number;

  @Prop({ type: () => [CharacteristicValues], _id: false })
  characteristics: CharacteristicValues[];
}

export const OptionsSchema = SchemaFactory.createForClass(Characteristic);