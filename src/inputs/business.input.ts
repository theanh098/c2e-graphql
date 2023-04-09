import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min
} from 'class-validator';

@ArgsType()
export class RandomBusinessesInput {
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
