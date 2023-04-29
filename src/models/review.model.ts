import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ReviewStatuses } from '@prisma/client';
import { Activity } from './activity.model';
import { Business } from './business.model';
import { CriteriaReview } from './criteria-review.model';
import { Reply } from './reply.model';
import { ReviewHistory } from './review-history.model';
import { User } from './user.model';
import { Notification } from './notification.model';

registerEnumType(ReviewStatuses, {
  name: 'ReviewStatuses'
});
@ObjectType()
export class Review {
  @Field(() => Int)
  id: number;

  @Field(() => ReviewStatuses)
  status: ReviewStatuses;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  rate: number;

  @Field(() => Int)
  businessId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => [Int], { nullable: 'items' })
  likes: Array<number>;

  @Field(() => [Int], { nullable: 'items' })
  dislikes: Array<number>;

  @Field(() => [Int], { nullable: 'items' })
  sharings: Array<number>;

  @Field(() => String, { nullable: true })
  headline?: string;

  @Field(() => String, { nullable: true })
  comment?: string;

  @Field(() => String, { nullable: true })
  txnHash?: string;

  @Field(() => [CriteriaReview], { nullable: 'items' })
  criterias: Array<CriteriaReview>;

  @Field(() => [ReviewHistory], { nullable: 'items' })
  histories: Array<ReviewHistory>;

  @Field(() => [Reply], { nullable: 'items' })
  replies: Array<Reply>;

  @Field(() => [Notification], { nullable: 'items' })
  notifications?: Array<Notification>;

  @Field(() => [Activity], { nullable: 'items' })
  activities?: Array<Activity>;

  @Field(() => Business)
  business: Business;

  @Field(() => User)
  user: User;
}
