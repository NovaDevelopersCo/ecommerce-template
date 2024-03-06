import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/core/enum/role.enum';

export class JwtPayload {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  role: Role;
}
