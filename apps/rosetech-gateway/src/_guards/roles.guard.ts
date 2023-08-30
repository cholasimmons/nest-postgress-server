
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
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

    // const { user } = context.switchToHttp().getRequest();
    
    if (!requiredRoles) {
      // throw new ForbiddenException('You do not have access.')
      return true;
    }
    console.log('Required Roles: ',requiredRoles);

    const { user } = context.switchToHttp().getRequest();

    if(!user) { console.warn('No User in header'); return false; }
    
    console.log('This User\'s roles: ',user.roles);

    return requiredRoles.some((role: Role) => user.roles.includes(role));
  }
}
