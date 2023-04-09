import { Field, Int, ObjectType } from '@nestjs/graphql';

import { GraphQLJSON } from 'graphql-type-json';
import { Did, Prisma } from '@prisma/client';
import { UserModel } from './user.model';

@ObjectType()
export class DidModel implements Did {
  @Field(() => Int)
  id!: number;

  @Field(() => GraphQLJSON)
  doc!: Prisma.JsonValue;

  @Field(() => String)
  txnHash!: string;

  @Field(() => [UserModel], { nullable: true })
  users!: Array<UserModel>;
}
