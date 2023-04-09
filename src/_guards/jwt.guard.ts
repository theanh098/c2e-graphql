import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any
  ): TUser {
    if (info?.message)
      throw new UnauthorizedException({
        message: info.message,
        status: HttpStatus.UNAUTHORIZED
      });

    return super.handleRequest(err, user, info, context, status);
  }
}
