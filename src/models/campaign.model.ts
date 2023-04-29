import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UsersOnCampaigns } from './users-on-campaigns.model';

@ObjectType()
export class Campaign {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  metadata?: string;

  @Field(() => [UsersOnCampaigns], { nullable: 'items' })
  usersOnCampaign: Array<UsersOnCampaigns>;
}
