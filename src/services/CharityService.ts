import { RepositoryInterface } from '../repositories/RepositoryInterface';
import { Charity } from '../models/Charity';

export class CharityService {
  constructor(private charityRepository: RepositoryInterface<Charity>) {}

  async createCharity(name: string, description: string): Promise<Charity> {
    const id = Math.random().toString(36).substring(2, 15);
    const charity = { id, name, description };
    return this.charityRepository.save(charity);
  }

  async getCharity(id: string): Promise<Charity | null> {
    return this.charityRepository.findById(id);
  }

  async findAll(): Promise<Charity[]> {
    return this.charityRepository.findAll();
  }
}