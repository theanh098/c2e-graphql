import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PayloadToSign } from 'types/auth.payload';

//Graphql context
export const User = createParamDecorator(
  (data: keyof PayloadToSign, ctx: ExecutionContext) => {
    const { req } = GqlExecutionContext.create(ctx).getContext();

    const user = req.user;

    return data ? user?.[data] : user;
  }
);
