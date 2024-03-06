import { ApiProperty } from '@nestjs/swagger';
import { JwtPayload } from '../jwt-payload';

export class ResponseRefresh {
  @ApiProperty()
  accessToken: string;
}

export class ResponseOK extends ResponseRefresh {
  @ApiProperty()
  user: JwtPayload;
}
