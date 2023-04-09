import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Campaign } from '@prisma/client';
import { UserModel } from './user.model';

@ObjectType()
export class CampaignModel implements Campaign {
  @Field(() => Int)
  id!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String, { nullable: true })
  metadata!: string | null;

  @Field(() => [UserModel])
  usersOnCampaign!: Array<UserModel>;
}
