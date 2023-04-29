import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MediaSoucres } from '@prisma/client';
import { Business } from './business.model';

registerEnumType(MediaSoucres, {
  name: 'MediaSoucres'
});

@ObjectType()
export class Media {
  @Field(() => Int)
  id: number;

  @Field(() => MediaSoucres)
  source: MediaSoucres;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  businessId: number;

  @Field(() => String, { nullable: true })
  path?: string;

  @Field(() => Business)
  business?: Business;
}
