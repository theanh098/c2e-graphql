import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DecodedPayload } from 'types/auth.payload';
import { Roles } from 'types/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<Roles>('role', context.getHandler());
    if (role !== Roles.Admin) {
      return true;
    }
    const { req } = GqlExecutionContext.create(context).getContext();
    const user = req.user as DecodedPayload;
    return user.isAdmin;
  }
}
