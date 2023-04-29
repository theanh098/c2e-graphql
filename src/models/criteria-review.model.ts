import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Review } from './review.model';

@ObjectType()
export class CriteriaReview {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  value: number;

  @Field(() => Int)
  reviewId: number;

  @Field(() => Review)
  review: Review;
}
