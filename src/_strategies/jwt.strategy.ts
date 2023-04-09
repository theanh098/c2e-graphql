import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DecodedPayload } from 'types/auth.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET
    });
  }

  async validate(payload: DecodedPayload) {
    if (!payload.id) throw new UnauthorizedException();
    return {
      walletAddress: payload.walletAddress,
      id: payload.id,
      isAdmin: payload.isAdmin
    };
  }
}
