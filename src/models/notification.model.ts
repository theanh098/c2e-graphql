import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BusinessModel } from './business.model';
import { ReviewModel } from './review.model';
import { UserModel } from './user.model';
import { Notification } from '@prisma/client';

@ObjectType()
export class NotificationModel implements Notification {
  @Field(() => Int)
  id!: number;

  @Field(() => Notificationtypes)
  type!: keyof typeof Notificationtypes;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  businessId!: number;

  @Field(() => Int)
  reviewId!: number;

  @Field(() => Boolean, { defaultValue: false })
  seen!: boolean;

  @Field(() => Int)
  to!: number;

  @Field(() => Int, { nullable: true })
  from!: number | null;

  @Field(() => String, { nullable: true })
  metaData!: string | null;

  @Field(() => BusinessModel)
  business!: BusinessModel;

  @Field(() => ReviewModel)
  review!: ReviewModel;

  @Field(() => UserModel)
  userTo!: UserModel;

  @Field(() => UserModel, { nullable: true })
  userFrom!: UserModel | null;
}

enum Notificationtypes {
  like = 'like',
  dislike = 'dislike',
  reply = 'reply',
  tagged = 'tagged',
  review_rejected = 'review_rejected',
  review_approved = 'review_approved'
}

registerEnumType(Notificationtypes, {
  name: 'Notificationtypes',
  description: undefined
});
