import { Field, Int, registerEnumType } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { BusinessStatus } from '@prisma/client';
import { Review } from './review.model';
import { Media } from './media.model';
import { FollowersOnBusinesses } from './followers-on-businesses.model';
import { RatesOnBusinesses } from './rates-on-businesses.model';
import { FeedbacksOnBusinesses } from './feedbacks-on-businesses.model';

registerEnumType(BusinessStatus, {
  name: 'BusinessStatus'
});

@ObjectType()
export class Business {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  mainCategory: string;

  @Field(() => BusinessStatus)
  status: BusinessStatus;

  @Field(() => [String], { nullable: 'items' })
  type: Array<string>;

  @Field(() => [String], { nullable: 'items' })
  tags: Array<string>;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  overview: string;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Int, { nullable: true })
  cmcId?: number;

  @Field(() => String, { nullable: true })
  logo?: string;

  @Field(() => String, { nullable: true })
  founderName?: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  whitepaperUrl?: string;

  @Field(() => String, { nullable: true })
  contractAddress?: string;

  @Field(() => String, { nullable: true })
  contractChain?: string;

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => [String], { nullable: true })
  chains?: Array<string>;

  @Field(() => [Review], { nullable: 'items' })
  reviews?: Array<Review>;

  @Field(() => [Media], { nullable: 'items' })
  medias?: Array<Media>;

  @Field(() => [FollowersOnBusinesses], { nullable: 'items' })
  followers?: Array<FollowersOnBusinesses>;

  @Field(() => [RatesOnBusinesses], { nullable: 'items' })
  ratings?: Array<RatesOnBusinesses>;

  @Field(() => [FeedbacksOnBusinesses], { nullable: 'items' })
  feedbacks?: Array<FeedbacksOnBusinesses>;
}
