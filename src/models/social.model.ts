import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Social {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { nullable: true })
  lastUpdate?: Date;

  @Field(() => String, { nullable: true })
  twitterId?: string;

  @Field(() => String, { nullable: true })
  twitter?: string;

  @Field(() => String, { nullable: true })
  discordId?: string;

  @Field(() => String, { nullable: true })
  discord?: string;

  @Field(() => String, { nullable: true })
  telegramId?: string;

  @Field(() => String, { nullable: true })
  telegram?: string;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  user?: User;
}
