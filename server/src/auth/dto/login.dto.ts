import { RegistrationDto } from './registration.dto';
import { PickType } from '@nestjs/swagger';

export class LoginDto extends PickType(RegistrationDto, [
  'email',
  'password',
] as const) {}
