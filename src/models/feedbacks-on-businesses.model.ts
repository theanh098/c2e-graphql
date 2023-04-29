import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Business } from './business.model';
import { User } from './user.model';
import { ReplyOnFeedback } from './reply-on-feedback.model';

@ObjectType()
export class FeedbacksOnBusinesses {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  businessId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => String)
  text: string;

  @Field(() => [String], { nullable: 'items' })
  urls: Array<string>;

  @Field(() => [Int], { nullable: 'items' })
  likes: Array<number>;

  @Field(() => [Int], { nullable: 'items' })
  dislikes: Array<number>;

  @Field(() => Business)
  business: Business;

  @Field(() => User)
  user: User;

  @Field(() => [ReplyOnFeedback], { nullable: 'items' })
  replies: Array<ReplyOnFeedback>;
}
