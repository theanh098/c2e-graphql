import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { SiweMessage } from 'siwe';

@Injectable()
export class SignEthereumInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { message, signature } = req.body;

    try {
      const siweMessage = new SiweMessage(message);
      const fields = await siweMessage.validate(signature);

      req.user = {
        walletAddress: fields.address
      };

      return next.handle();
    } catch (error) {
      throw new HttpException(
        'Sign to Ethereum not valid',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
