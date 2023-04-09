import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BusinessModel } from 'models/business.model';
import { PaginatedQueryFactory } from './paginated.query';

@ObjectType()
export class PaginatedBusinesses extends PaginatedQueryFactory(BusinessModel) {}

@ObjectType()
export class RandomBusinesses {
  @Field(() => [BusinessModel], { nullable: 'items' })
  data: BusinessModel[];

  @Field(() => Int)
  limit: number;

  @Field(() => Int, { nullable: true })
  totalProject?: number;

  @Field(() => Int, { nullable: true })
  totalReview?: number;
}
