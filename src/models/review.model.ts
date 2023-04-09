import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Review } from '@prisma/client';
import { ReplyModel } from './reply.model';
import { BusinessModel } from './business.model';
import { UserModel } from './user.model';

@ObjectType()
export class ReviewModel implements Review {
  @Field(() => Int)
  id!: number;

  @Field(() => ReviewStatuses, { defaultValue: 'pending' })
  status!: keyof typeof ReviewStatuses;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  rate!: number;

  @Field(() => Int)
  businessId!: number;

  @Field(() => Int)
  userId!: number;

  @Field(() => [Int], { nullable: 'items' })
  likes!: Array<number>;

  @Field(() => [Int], { nullable: 'items' })
  dislikes!: Array<number>;

  @Field(() => [Int], { nullable: 'items' })
  sharings!: Array<number>;

  @Field(() => String, { nullable: true })
  headline!: string | null;

  @Field(() => String, { nullable: true })
  comment!: string | null;

  @Field(() => String, { nullable: true })
  txnHash!: string | null;

  @Field(() => BusinessModel)
  business!: BusinessModel;

  @Field(() => UserModel)
  user!: UserModel;

  @Field(() => [ReplyModel])
  replies!: Array<ReplyModel>;
}

enum ReviewStatuses {
  approved = 'approved',
  pending = 'pending',
  rejected = 'rejected'
}

registerEnumType(ReviewStatuses, {
  name: 'ReviewStatuses',
  description: undefined
});
