import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { ReplyModel } from './reply.model';
import { ReviewModel } from './review.model';
import { BusinessModel } from './business.model';
import { NotificationModel } from './notification.model';
import { CampaignModel } from './campaign.model';
import { DidModel } from './did.model';
import { FeedbackOnBusinessModelodel } from './feedback-on-business.model';
import { ReplyOnFeedbackModel } from './reply-on-feedback.model';

@ObjectType()
export class UserModel implements Omit<User, 'refreshToken'> {
  @Field(() => Int)
  id!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => String)
  walletAddress!: string;

  @Field(() => Boolean, { defaultValue: true })
  notiAccepted!: boolean;

  @Field(() => Boolean, { defaultValue: true })
  spamAccepted!: boolean;

  @Field(() => String, { nullable: true })
  email!: string | null;

  @Field(() => String, { nullable: true })
  nickname!: string | null;

  @Field(() => String, { nullable: true })
  avatarUrl!: string | null;

  @Field(() => Boolean, { defaultValue: false })
  isAdmin!: boolean;

  @Field(() => String, { nullable: true })
  password!: string | null;

  @Field(() => Date, { nullable: true })
  lastEditedDate!: Date | null;

  @Field(() => String, { nullable: true })
  role!: string | null;

  @Field(() => String, { nullable: true })
  backgroundUrl!: string | null;

  @Field(() => String, { nullable: true })
  address!: string | null;

  @Field(() => String, { nullable: true })
  bio!: string | null;

  @Field(() => String, { nullable: true })
  website!: string | null;

  @Field(() => String, { nullable: true })
  facebook!: string | null;

  @Field(() => String, { nullable: true })
  twitter!: string | null;

  @Field(() => String, { nullable: true })
  google!: string | null;

  @Field(() => String, { nullable: true })
  linkedin!: string | null;

  @Field(() => String, { nullable: true })
  telegram!: string | null;

  @Field(() => String, { nullable: true })
  discord!: string | null;

  @Field(() => Int, { nullable: true })
  didId!: number | null;

  @Field(() => [ReplyModel])
  replies!: Array<ReplyModel>;

  @Field(() => [ReviewModel])
  reviews!: Array<ReviewModel>;

  @Field(() => [BusinessModel])
  followingBusinesses!: Array<BusinessModel>;

  @Field(() => [BusinessModel])
  ratedBusinesses!: Array<BusinessModel>;

  @Field(() => [NotificationModel])
  notifications!: Array<NotificationModel>;

  @Field(() => [CampaignModel])
  onCampaigns!: Array<CampaignModel>;

  @Field(() => DidModel, { nullable: true })
  did!: DidModel | null;

  @Field(() => [FeedbackOnBusinessModelodel])
  feedbacksOnBusinesses!: Array<FeedbackOnBusinessModelodel>;

  @Field(() => [ReplyOnFeedbackModel])
  repliesOnFeedbacks!: Array<ReplyOnFeedbackModel>;
}
