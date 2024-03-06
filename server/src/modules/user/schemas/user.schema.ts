import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractModel } from 'src/core/abstract/abstract.schema';
import { Role } from 'src/core/enum/role.enum';

@Schema()
export class User extends AbstractModel {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, default: Role.USER, enum: Role })
  role: Role;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
