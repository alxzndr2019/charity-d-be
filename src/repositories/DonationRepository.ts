import { Donation } from '../models/Donation';
import { RepositoryInterface } from './RepositoryInterface';

export class DonationRepository implements RepositoryInterface<Donation> {
  private donations: Donation[] = [];

  async save(donation: Donation): Promise<Donation> {
    this.donations.push(donation);
    return donation;
  }

  async findById(id: string): Promise<Donation | null> {
    const donation = this.donations.find(d => d.id === id);
    return donation || null;
  }

  async findAll(): Promise<Donation[]> {
    return this.donations;
  }

  async where(query: any): Promise<Donation[]> {
    return this.donations.filter(donation => {
      for (const key in query) {
        if (query.hasOwnProperty(key) && donation[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }
}