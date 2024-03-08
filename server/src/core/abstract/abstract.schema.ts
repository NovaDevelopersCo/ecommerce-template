import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

@Schema({ timestamps: true })
export abstract class AbstractModel {
  @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty()
  @Prop({ default: Date.now })
  createdAt!: Date;

  @ApiProperty()
  @Prop({ default: Date.now })
  updatedAt!: Date;
}
