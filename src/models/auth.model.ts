import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignEthereumResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
