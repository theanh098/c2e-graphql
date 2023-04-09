import { Field, Int, ObjectType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { Business } from '@prisma/client';
import { ReviewModel } from './review.model';
import { MediaModel } from './media.model';
import { UserModel } from './user.model';
import { FeedbackOnBusinessModelodel } from './feedback-on-business.model';

@ObjectType()
export class BusinessModel implements Omit<Business, 'creatorId' | 'status'> {
  @Field(() => Int)
  id!: number;

  @Field(() => MainCategories)
  mainCategory!: keyof typeof MainCategories;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  overview!: string;

  @Field(() => [String], { nullable: 'items' })
  chains!: Array<string>;

  @Field(() => [String])
  type!: Array<string>;

  @Field(() => String, { nullable: true })
  token!: string | null;

  @Field(() => Int, { nullable: true })
  cmcId!: number | null;

  @Field(() => String, { nullable: true })
  logo!: string | null;

  @Field(() => String, { nullable: true })
  founderName!: string | null;

  @Field(() => Date, { nullable: true })
  startDate!: Date | null;

  @Field(() => String, { nullable: true })
  address!: string | null;

  @Field(() => String, { nullable: true })
  whitepaperUrl!: string | null;

  @Field(() => String, { nullable: true })
  contractAddress!: string | null;

  @Field(() => String, { nullable: true })
  contractChain!: string | null;

  @Field(() => String, { nullable: true })
  website!: string | null;

  @Field()
  followByU?: boolean;

  @Field(() => [ReviewModel], { nullable: 'items' })
  reviews?: Array<ReviewModel>;

  @Field(() => [MediaModel], { nullable: 'items' })
  medias?: Array<MediaModel>;

  @Field(() => [UserModel], { nullable: 'items' })
  followers?: Array<UserModel>;

  @Field(() => [FeedbackOnBusinessModelodel], { nullable: 'items' })
  feedbacks?: Array<FeedbackOnBusinessModelodel>;
}

enum BusinessStatus {
  approved = 'approved',
  pending = 'pending',
  rejected = 'rejected'
}

enum MainCategories {
  currencies = 'currencies',
  exchange = 'exchange',
  cryptocurrencies = 'cryptocurrencies',
  nft = 'nft',
  metaverse = 'metaverse',
  ai = 'ai',
  others = 'others',
  lightning_network = 'lightning_network'
}

registerEnumType(MainCategories, {
  name: 'MainCategories',
  description: undefined
});

registerEnumType(BusinessStatus, {
  name: 'BusinessStatus',
  description: undefined
});
