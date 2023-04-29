import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { User } from './user.model';
import { Business } from './business.model';

@ObjectType()
export class FollowersOnBusinesses {
  @Field(() => Int)
  followerId: number;

  @Field(() => Int)
  businessId: number;

  @Field(() => User)
  follower: User;

  @Field(() => Business)
  business: Business;
}
