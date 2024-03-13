import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractModel } from '@core/abstract/abstract.schema';
import { Role } from '@/core/enums';

@Schema()
export class User extends AbstractModel {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  @Prop({ type: String, default: Role.USER, enum: Role })
  role: Role;

  @ApiProperty()
  @Prop({ required: true })
  phone: number;

  @ApiProperty()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
