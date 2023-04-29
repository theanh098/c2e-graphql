import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Review } from './review.model';

@ObjectType()
export class ReviewHistory {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  rate: number;

  @Field(() => Int)
  reviewId: number;

  @Field(() => String)
  txnHash: string;

  @Field(() => String, { nullable: true })
  headline?: string;

  @Field(() => String, { nullable: true })
  comment?: string;

  @Field(() => Review)
  review: Review;
}
