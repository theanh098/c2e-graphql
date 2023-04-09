import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Email } from '@prisma/client';

@ObjectType()
export class EmailModel implements Email {
  @Field(() => Int)
  id!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  code!: string | null;
}
