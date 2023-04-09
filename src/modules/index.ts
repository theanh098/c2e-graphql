import { AuthModule } from './auth/auth.module';
import { BusinessModelodule } from './business/business.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewModule } from './review/review.module';

export const C2E_MODULES = [
  AuthModule,
  BusinessModelodule,
  ReviewModule,
  PrismaModule
];
