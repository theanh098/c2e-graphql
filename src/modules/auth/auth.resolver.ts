import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { SignEthereumGuard } from '_guards/sign-ethereum.guard';
import { User } from '_decorators/user.decorator';
import { SignEthereumResponse } from 'models/auth.model';
import { SignMessageInputs } from 'inputs/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly AuthService: AuthService) {}

  @Mutation(() => SignEthereumResponse)
  @UseGuards(SignEthereumGuard)
  signEthereum(
    @User('walletAddress') wallet: string,
    @Args() _signInputs: SignMessageInputs
  ) {
    console.log('wallet: ', wallet);
  }
}
