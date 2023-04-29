import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min
} from 'class-validator';
import { Business } from 'models/business.model';
import { PaginatedQueryFactory } from 'queries/paginated.query';

@ArgsType()
export class RandomBusinessesArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  type?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  hasBannerOnly?: boolean;

  @Field(() => Int)
  @IsInt()
  @Max(100)
  @Min(1)
  limit!: number;
}
