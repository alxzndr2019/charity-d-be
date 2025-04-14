import { Donation } from '../models/Donation';
import { RepositoryInterface } from '../repositories/RepositoryInterface';

export class DonationService {
  constructor(
    private donationRepository: RepositoryInterface<Donation>,
    private userRepository: RepositoryInterface<any>, // Replace 'any' with your User model type
    private charityRepository: RepositoryInterface<any> // Replace 'any' with your Charity model type
  ) {}

  async processDonation(userId: string, charityId: string, amount: number, currency: string): Promise<Donation> {
    // Check if user and charity exist
    const user = await this.userRepository.findById(userId);
    const charity = await this.charityRepository.findById(charityId);

    if (!user || !charity) {
      throw new Error('Invalid user or charity ID');
    }

    const id = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    const donation: Donation = { id, userId, charityId, amount, currency, timestamp };
    return this.donationRepository.save(donation);
  }

  async getDonationsByCharity(charityId: string): Promise<Donation[]> {
    try {
      return await this.donationRepository.where({ charityId });
    } catch (error) {
      throw new Error(`Error fetching donations for charity: ${error}`);
    }
  }

  async getDonationsByUser(userId: string): Promise<Donation[]> {
    try {
      return await this.donationRepository.where({ userId });
    } catch (error) {
      throw new Error(`Error fetching donations for user: ${error}`);
    }
  }
}