import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/modules/user/schemas/user.schema';

export class JwtPayload extends PickType(User, ['email', 'name', 'role']) {
  @ApiProperty()
  id: string;
}
