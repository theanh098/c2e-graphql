import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Business } from './business.model';
import { User } from './user.model';

@ObjectType()
export class RatesOnBusinesses {
  @Field(() => Int)
  valuerId: number;

  @Field(() => Int)
  businessId: number;

  @Field(() => Int)
  rating: number;

  @Field(() => User)
  valuer: User;

  @Field(() => Business)
  business: Business;
}
