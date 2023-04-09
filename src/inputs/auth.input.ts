import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SiweMessage } from 'siwe';

@InputType()
export class SiweMessageInputs extends SiweMessage {
  @Field()
  address: string;

  @Field()
  chainId: number;

  @Field()
  domain: string;

  @Field()
  issuedAt: string;

  @Field()
  nonce: string;

  @Field()
  statement: string;

  @Field()
  uri: string;

  @Field()
  version: string;
}

@ArgsType()
export class SignMessageInputs {
  @Field(() => SiweMessageInputs)
  message: SiweMessageInputs;

  @Field()
  signature: string;

  walletAddress: string;
}
