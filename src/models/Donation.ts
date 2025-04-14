// Updated Donation model.
export interface Donation {
  id: string;
  amount: number;
  currency: string;
  timestamp: number;
  userId: string;
  charityId: string;
}