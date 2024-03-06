import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ uniqueItems: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  phone: number;

  @ApiProperty({ maxLength: 32, minLength: 6 })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
