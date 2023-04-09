import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { DecodedPayload } from 'types/auth.payload';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AttchedUserInterceptor implements NestInterceptor {
  private readonly jwtService = new JwtService();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { req } = GqlExecutionContext.create(context).getContext();

    const token = req.headers.authorization?.split(' ')[1];

    try {
      const payload = this.jwtService.verify<DecodedPayload>(token, {
        secret: process.env.ACCESS_TOKEN_SECRET
      });
      req.user = {
        walletAddress: payload.walletAddress,
        id: payload.id
      };
      return next.handle();
    } catch (error) {
      return next.handle();
    }
  }
}
