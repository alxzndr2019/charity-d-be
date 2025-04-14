import { RepositoryInterface } from '../repositories/RepositoryInterface';
import { User } from '../models/User';

export class UserService {
  constructor(private userRepository: RepositoryInterface<User>) {}

  async createUser(name: string, email: string): Promise<User> {
    const id = Math.random().toString(36).substring(2, 15);
    const user: User = { id, name, email };
    return this.userRepository.save(user);
  }

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}