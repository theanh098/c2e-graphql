import { Field, Int, registerEnumType } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ActivityKind } from '@prisma/client';
import { User } from './user.model';
import { Review } from './review.model';

registerEnumType(ActivityKind, {
  name: 'ActivityKind'
});

@ObjectType()
export class Activity {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => ActivityKind)
  kind: ActivityKind;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  reviewId: number;

  @Field(() => Int)
  point: number;

  @Field(() => Int, { nullable: true })
  fromUserId?: number;

  @Field(() => User)
  user: User;

  @Field(() => User, { nullable: true })
  reactUser?: User;

  @Field(() => Review)
  onReview?: Review;
}
