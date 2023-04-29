import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Business } from './business.model';
import { Review } from './review.model';
import { User } from './user.model';

@ObjectType()
export class Notification {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  type: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  seen: boolean;

  @Field(() => Int)
  to: number;

  @Field(() => Int, { nullable: true })
  reviewId?: number;

  @Field(() => Int, { nullable: true })
  businessId?: number;

  @Field(() => Int, { nullable: true })
  from?: number;

  @Field(() => String, { nullable: true })
  metaData?: string;

  @Field(() => User)
  userTo: User;

  @Field(() => Business, { nullable: true })
  business?: Business;

  @Field(() => Review, { nullable: true })
  review?: Review;

  @Field(() => User, { nullable: true })
  userFrom?: User;
}
