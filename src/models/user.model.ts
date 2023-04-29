import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Activity } from './activity.model';
import { Reply } from './reply.model';
import { Review } from './review.model';
import { Social } from './social.model';
import { UsersOnCampaigns } from './users-on-campaigns.model';
import { Notification } from './notification.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  walletAddress: string;

  @Field(() => Boolean)
  notiAccepted: boolean;

  @Field(() => Boolean)
  spamAccepted: boolean;

  @Field(() => Boolean)
  isAdmin: boolean;

  @Field(() => Date, { nullable: true })
  lastUpdate?: Date;

  @Field(() => Date, { nullable: true })
  lastSyncIbt?: Date;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  backgroundUrl?: string;

  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Social, { nullable: true })
  socical?: Social;

  @Field(() => [Activity], { nullable: 'items' })
  myActivities: Array<Activity>;

  @Field(() => [Activity], { nullable: 'items' })
  myReactActivities: Array<Activity>;

  @Field(() => [Reply], { nullable: 'items' })
  replies: Array<Reply>;

  @Field(() => [Review], { nullable: 'items' })
  reviews: Array<Review>;

  @Field(() => [Notification], { nullable: 'items' })
  notificationsTo: Array<Notification>;

  @Field(() => [UsersOnCampaigns], { nullable: 'items' })
  onCampaigns: Array<UsersOnCampaigns>;
}
