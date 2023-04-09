import { Review } from '@prisma/client';

export type BestReview = Pick<
  Review,
  'id' | 'rate' | 'comment' | 'headline'
> & {
  nolikes: number;
  userWalletAddress: string;
  businessId: number;
  businessName: string;
};
