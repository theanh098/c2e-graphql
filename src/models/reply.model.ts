import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Review } from './review.model';
import { User } from './user.model';

@ObjectType()
export class Reply {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  desc: string;

  @Field(() => Int)
  reviewId: number;

  @Field(() => [Int], { nullable: 'items' })
  likes: Array<number>;

  @Field(() => [Int], { nullable: 'items' })
  dislikes: Array<number>;

  @Field(() => Int)
  userId: number;

  @Field(() => Review)
  review: Review;

  @Field(() => User)
  user: User;
}
