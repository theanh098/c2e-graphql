import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

export interface IPaginatedType<T> {
  data: T[];
  limit: number;
  page: number;
  total: number;
}

@ArgsType()
export class PaginatedInput {
  @Field(() => Int)
  @IsInt()
  @Max(100)
  limit: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  page: number;
}

export function PaginatedQueryFactory<T>(
  classRef: Type<T>
): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: 'items' })
    data: T[];

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    total: number;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
