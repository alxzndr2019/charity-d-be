import { Charity } from '../models/Charity';
import { RepositoryInterface } from './RepositoryInterface';

export class CharityRepository implements RepositoryInterface<Charity> {
  private charities: Charity[] = [];

  async save(charity: Charity): Promise<Charity> {
    this.charities.push(charity);
    return charity;
  }

  async findById(id: string): Promise<Charity | null> {
    return this.charities.find(charity => charity.id === id) || null;
  }

  async findAll(): Promise<Charity[]> {
    return this.charities;
  }

  async where(query: any): Promise<Charity[]> {
    return this.charities.filter(charity =>
      Object.keys(query).every(key => charity[key] === query[key])
    );
  }
}