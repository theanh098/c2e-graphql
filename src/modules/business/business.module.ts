import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessResolver } from './business.resolver';
import { WhereBuilder } from 'utils/querybuilder';

@Module({
  providers: [
    BusinessResolver,
    BusinessService,
    { provide: 'WHERE_BUILDER', useClass: WhereBuilder }
  ]
})
export class BusinessModelodule {}
