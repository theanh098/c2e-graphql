import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AdminLocalStrategy } from '_strategies/admin.strategy';
import { JwtRefreshStrategy } from '_strategies/jwtRefresh.strategy';
import { JwtStrategy } from '_strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [PassportModule, JwtModule],
  providers: [
    AuthService,
    AdminLocalStrategy,
    JwtRefreshStrategy,
    JwtStrategy,
    AuthResolver
  ]
})
export class AuthModule {}
