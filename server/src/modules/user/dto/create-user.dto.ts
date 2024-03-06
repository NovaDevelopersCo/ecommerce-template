import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  phone: number;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
