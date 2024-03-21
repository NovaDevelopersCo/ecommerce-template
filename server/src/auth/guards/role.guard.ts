import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@core/enums';
import { AccessJwtGuard } from './access-jwt.guard';

export const ROLES_KEY = 'roles_key';

@Injectable()
class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return roles.some((role) => user.role === role);
  }
}

export const RolesAuthGuard = (...roles: Role[]) => {
  return applyDecorators(
    AccessJwtGuard(),
    SetMetadata(ROLES_KEY, roles),
    UseGuards(RolesGuard),
  );
};
