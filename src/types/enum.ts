export enum ReviewAdminAction {
  Approve = 'approve',
  Reject = 'reject'
}

export enum Roles {
  User = 'user',
  Admin = 'admin'
}

export enum Interacting {
  Helpful = 'helpful',
  Downful = 'downful'
}

export const Queues = {
  Email: 'Email',
  Notification: 'Notification'
} as const;

export const EmailJobs = {
  SendToAdminWithNewReview: 'SendToAdminWithNewReview',
  SendFeedBackUser: 'SendFeedBackUser'
} as const;

export const NotificationJobs = {
  ReplyCreated: 'replyCreated',
  LikeCreated: 'likeCreated',
  RemoveLike: 'removeLike',
  ReviewApproved: 'ReviewApproved',
  ReviewRejected: 'ReviewRejected'
};

export type SendToAdminWithNewReviewPayload = {
  headline: string;
  comment: string;
};
