import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { FeedbackOnBusinessModelodel } from './feedback-on-business.model';
import { ReplyOnFeedback } from '@prisma/client';

@ObjectType()
export class ReplyOnFeedbackModel implements ReplyOnFeedback {
  @Field(() => Int)
  id!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  feedbackId!: number;

  @Field(() => Int)
  userId!: number;

  @Field(() => String)
  desc!: string;

  @Field(() => UserModel)
  user!: UserModel;

  @Field(() => FeedbackOnBusinessModelodel)
  feedback!: FeedbackOnBusinessModelodel;
}
