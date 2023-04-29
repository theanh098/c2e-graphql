import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FeedbacksOnBusinesses } from './feedbacks-on-businesses.model';
import { User } from './user.model';

@ObjectType()
export class ReplyOnFeedback {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  feedbackId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => String)
  desc: string;

  @Field(() => User)
  user: User;

  @Field(() => FeedbacksOnBusinesses)
  feedback: FeedbacksOnBusinesses;
}
