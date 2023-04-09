import {
  applyDecorators,
  CanActivate,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { Roles } from 'types/enum';
import { JwtAuthGuard } from '_guards/jwt.guard';
import { RolesGuard } from '_guards/roles.guard';

export function Auth(
  role = Roles.User,
  /* eslint-disable-next-line */
  ...AnyGuardElse: Array<Function | CanActivate>
) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(JwtAuthGuard, RolesGuard, ...AnyGuardElse)
  );
}
