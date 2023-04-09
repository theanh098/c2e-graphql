import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BusinessService } from './business.service';
import { BusinessModel } from 'models/business.model';
import { PaginatedBusinesses, RandomBusinesses } from 'queries/business.query';
import { RandomBusinessesInput } from 'inputs';
import { UseInterceptors } from '@nestjs/common';
import { AttchedUserInterceptor } from '_interceptors/attch-user.interceptor';
import { User } from '_decorators/user.decorator';

@Resolver(of => BusinessModel)
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}

  // @Query(returns => PaginatedBusinesses, { name: 'businessses' })
  // async getBusinesses(@Args() ) {}

  @Query(returns => RandomBusinesses, { name: 'randomBusinesses' })
  @UseInterceptors(AttchedUserInterceptor)
  async getBusinesses(
    @Args() inputs: RandomBusinessesInput
  ): Promise<RandomBusinesses> {
    return this.businessService.findRandom(inputs);
  }

  @ResolveField('followByU', () => Boolean)
  async isFollowing(
    @Parent() { id }: BusinessModel,
    @User('id') userId: number
  ) {
    return this.businessService.resolveIsFollowing(id, userId);
  }
}
