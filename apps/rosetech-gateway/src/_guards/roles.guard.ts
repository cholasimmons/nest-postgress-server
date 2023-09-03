
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../_decorators/roles.decorator';
import { Role } from '../_enums/role.enum';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), context.getClass(),
    ]);
    
    if (!requiredRoles) {
      // throw new UnauthorizedException('You do not have permission to access this resource.')
      return true;
    }
    
    console.log('[RolesGuard] Required Roles: ',requiredRoles);

    const { user } = context.switchToHttp().getRequest();

    if(!user) { console.warn('[RolesGuard] No User object'); return false; }
    
    console.log('[RolesGuard] This User\'s roles: ',user.roles);

    const hasRequiredRoles = requiredRoles.some((role: Role) => user.roles.includes(role));

    if(!hasRequiredRoles){
      throw new UnauthorizedException('You do not have permission to access this resource.')
    }
    return true;
  }
}
