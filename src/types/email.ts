import { Business, Notification, User } from '@prisma/client';

export type NotiResponse = Pick<Notification, 'type'> & {
  userFrom: Pick<User, 'walletAddress' | 'nickname' | 'email'>;
} & {
  business: Pick<Business, 'name'>;
};

export interface SendNotiMailParam {
  emailTo: string;

  nickNameTo?: string;

  walletAddressTo: string;

  notifications: NotiResponse[];
}
