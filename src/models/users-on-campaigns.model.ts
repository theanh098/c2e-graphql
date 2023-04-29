import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Campaign } from './campaign.model';
import { User } from './user.model';

@ObjectType()
export class UsersOnCampaigns {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  campaignId: number;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  claimed: boolean;

  @Field(() => Int)
  amount: number;

  @Field(() => String, { nullable: true })
  txnHash?: string;

  @Field(() => User)
  user?: User;

  @Field(() => Campaign)
  campaign?: Campaign;
}
