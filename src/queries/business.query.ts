import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Business } from 'models/business.model';
import { PaginatedQueryFactory } from './paginated.query';

@ObjectType()
export class PaginatedBusinesses extends PaginatedQueryFactory(Business) {}

@ObjectType()
export class RandomBusinesses {
  @Field(() => [Business], { nullable: 'items' })
  data: Business[];

  @Field(() => Int)
  limit: number;

  @Field(() => Int, { nullable: true })
  totalProject?: number;

  @Field(() => Int, { nullable: true })
  totalReview?: number;
}
