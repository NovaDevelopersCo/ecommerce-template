import { RegistrationDto } from './registration.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginDto extends PickType(RegistrationDto, [
  'email',
  'password',
]) {}
