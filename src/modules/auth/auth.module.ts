import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminLocalStrategy } from '_strategies/admin.strategy';
import { JwtRefreshStrategy } from '_strategies/jwtRefresh.strategy';
import { JwtStrategy } from '_strategies/jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AdminLocalStrategy, JwtRefreshStrategy, JwtStrategy]
})
export class AuthModule {}
