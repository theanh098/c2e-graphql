import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Media } from '@prisma/client';

@ObjectType()
export class MediaModel implements Media {
  @Field(() => Int)
  id!: number;

  @Field(() => MediaSoucres)
  source!: keyof typeof MediaSoucres;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => String)
  url!: string;

  @Field(() => Int)
  businessId!: number;

  @Field(() => String, { nullable: true })
  path!: string | null;
}

export enum MediaSoucres {
  Photo = 'Photo',
  Telegram = 'Telegram',
  Discord = 'Discord',
  Twitter = 'Twitter',
  Blog = 'Blog'
}

registerEnumType(MediaSoucres, {
  name: 'MediaSoucres',
  description: undefined
});
