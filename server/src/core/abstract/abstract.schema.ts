import { Prop, Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

@Schema({ timestamps: true })
export abstract class AbstractModel {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}
