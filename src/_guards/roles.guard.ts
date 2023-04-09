import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'types/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<Roles>('role', context.getHandler());
    if (role !== Roles.Admin) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.isAdmin;
  }
}
