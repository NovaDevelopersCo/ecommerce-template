import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractModel } from '@core/abstract/abstract.schema';
import { User } from '@modules/user/schemas/user.schema';

@Schema()
export class Token extends AbstractModel {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true, unique: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
