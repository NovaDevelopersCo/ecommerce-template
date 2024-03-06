import { Role } from 'src/core/enum/role.enum';

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: Role;
}
