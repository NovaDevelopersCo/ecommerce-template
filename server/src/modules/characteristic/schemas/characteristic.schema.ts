import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { CharacteristicGroup } from "./characteristic-group.schema";
import { Types } from "mongoose";

@Schema()
export class Characteristic {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  sort: number;

   @Prop({ type: Types.ObjectId, ref: CharacteristicGroup.name })
  idGroup: CharacteristicGroup;
}

export const CharacteristicSchema = SchemaFactory.createForClass(Characteristic);