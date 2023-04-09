import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Reply } from '@prisma/client';
import { ReviewModel } from './review.model';
import { UserModel } from './user.model';

@ObjectType()
export class ReplyModel implements Reply {
  @Field(() => Int)
  id!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  reviewId!: number;

  @Field(() => Int)
  userId!: number;

  @Field(() => [Int], { nullable: 'items' })
  likes!: Array<number>;

  @Field(() => [Int], { nullable: 'items' })
  dislikes!: Array<number>;

  @Field(() => String)
  desc!: string;

  @Field(() => UserModel)
  user!: UserModel;

  @Field(() => ReviewModel)
  review!: ReviewModel;
}
