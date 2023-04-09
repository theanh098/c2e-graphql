import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FeedbacksOnBusinesses } from '@prisma/client';
import { BusinessModel } from './business.model';
import { UserModel } from './user.model';
import { ReplyOnFeedbackModel } from './reply-on-feedback.model';

@ObjectType()
export class FeedbackOnBusinessModelodel implements FeedbacksOnBusinesses {
  @Field(() => Int)
  id!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  businessId!: number;

  @Field(() => Int)
  userId!: number;

  @Field(() => String)
  text!: string;

  @Field(() => [String])
  urls!: Array<string>;

  @Field(() => [Int], { nullable: 'items' })
  likes!: Array<number>;

  @Field(() => [Int], { nullable: 'items' })
  dislikes!: Array<number>;

  @Field(() => BusinessModel)
  business!: BusinessModel;

  @Field(() => UserModel)
  user!: UserModel;

  @Field(() => [ReplyOnFeedbackModel])
  replies!: Array<ReplyOnFeedbackModel>;
}
