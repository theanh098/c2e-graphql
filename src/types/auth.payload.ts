export interface PayloadToSign {
  id: number;
  walletAddress: string;
  isAdmin?: boolean;
}

export type DecodedPayload = PayloadToSign;
