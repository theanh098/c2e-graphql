import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'modules/prisma/prisma.service';
import { generateNonce } from 'siwe';
import { DecodedPayload, PayloadToSign } from 'types/auth.payload';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private async generateTokens(payload: PayloadToSign) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      secret: process.env.ACCESS_TOKEN_SECRET
    });

    const refreshToken = this.jwtService.sign(
      { sub: payload.id },
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        secret: process.env.REFRESH_TOKEN_SECRET
      }
    );

    await this.prisma.user.update({
      where: { id: payload.id },
      data: {
        refreshToken
      }
    });

    return {
      accessToken,
      refreshToken
    };
  }

  nonceFactory() {
    return generateNonce();
  }

  async validateAdress(address: string): Promise<PayloadToSign> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        walletAddress: true,
        isAdmin: true
      },
      where: { walletAddress: address }
    });
    if (!user) {
      const newUser = await this.prisma.user.create({
        select: {
          id: true,
          walletAddress: true,
          isAdmin: true
        },
        data: {
          walletAddress: address
        }
      });

      return newUser;
    }
    return user;
  }

  async validateAdmin(email: string, pass: string): Promise<PayloadToSign> {
    const user = await this.prisma.user.findUnique({
      select: {
        password: true,
        isAdmin: true,
        walletAddress: true,
        id: true
      },
      where: { email }
    });
    if (!user) return null;
    const { password, isAdmin, id, walletAddress } = user;
    const isValid = await bcrypt.compare(pass, password);

    return isValid
      ? {
          isAdmin,
          id,
          walletAddress
        }
      : null;
  }

  async login(address: string) {
    const user = await this.validateAdress(address);

    const tokens = await this.generateTokens({
      id: user.id,
      walletAddress: user.walletAddress
    });
    return {
      ...tokens,
      user
    };
  }

  async adminLogin({ id, isAdmin, walletAddress }: DecodedPayload) {
    const tokens = await this.generateTokens({
      walletAddress,
      isAdmin,
      id: id
    });
    return {
      ...tokens
    };
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        walletAddress: true,
        refreshToken: true,
        id: true,
        isAdmin: true
      }
    });
    if (refreshToken !== user.refreshToken) throw new UnauthorizedException();
    const payload = {
      walletAddress: user.walletAddress,
      id: user.id,
      isAdmin: user.isAdmin
    };
    const tokens = await this.generateTokens(payload);
    const response = {
      ...tokens,
      user: {
        walletAddress: user.walletAddress,
        id: user.id
      }
    };
    return response;
  }
}
