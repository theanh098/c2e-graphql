import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SignMessageInputs } from 'inputs/auth.input';
import { SiweMessage } from 'siwe';

@Injectable()
export class SignEthereumGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context);

    const { req } = graphqlContext.getContext();
    const args = graphqlContext.getArgs<SignMessageInputs>();

    try {
      const { message, signature } = args;
      const siweMessage = new SiweMessage(message);
      const fields = await siweMessage.validate(signature);

      req.user = {
        walletAddress: fields.address
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Sign to Ethereum not valid');
    }
  }
}
