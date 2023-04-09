import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DecodedPayload } from 'types/auth.payload';
import { RestCtxUser, User } from '_decorators/user.decorator';
import { JwtRefreshAuthGuard } from '_guards/jwtRefresh.guard';
import { SignEthereumInterceptor } from '_interceptors/signEthereum.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce')
  getNonce() {
    const nonce = this.authService.nonceFactory();
    return nonce;
  }

  @Post('login')
  @UseInterceptors(SignEthereumInterceptor)
  login(@RestCtxUser('walletAddress') address: string) {
    return this.authService.login(address);
  }

  @Post('access-token')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @RestCtxUser('id') userId: number,
    @Body('refreshToken') refreshToken: string
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Post('admin-login')
  @UseGuards(AuthGuard('admin-local'))
  async adminLogin(@User() user: DecodedPayload) {
    return this.authService.adminLogin(user);
  }
}
