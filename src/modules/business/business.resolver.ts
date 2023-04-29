import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BusinessService } from './business.service';
import { Business } from 'models/business.model';
import { PaginatedBusinesses, RandomBusinesses } from 'queries/business.query';
import { RandomBusinessesArgs } from 'inputs';
import { UseInterceptors } from '@nestjs/common';
import { AttchedUserInterceptor } from '_interceptors/attch-user.interceptor';
import { User } from '_decorators/user.decorator';
import { PaginatedInput } from 'queries/paginated.query';

@Resolver(of => Business)
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}

  @Query(returns => PaginatedBusinesses, { name: 'businessses' })
  async getBusinesses(
    @Args() args: PaginatedInput
  ): Promise<PaginatedBusinesses> {
    return this.businessService.findBusinesses(args);
  }

  // @Query(returns => RandomBusinesses, { name: 'randomBusinesses' })
  // @UseInterceptors(AttchedUserInterceptor)
  // async getBusinesses(
  //   @Args() inputs: RandomBusinessesInput
  // ): Promise<RandomBusinesses> {
  //   return this.businessService.findRandom(inputs);
  // }

  @ResolveField('followByU', () => Boolean)
  async isFollowing(@Parent() { id }: Business, @User('id') userId: number) {
    return this.businessService.resolveIsFollowing(id, userId);
  }
}
