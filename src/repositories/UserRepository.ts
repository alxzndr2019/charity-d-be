import { RepositoryInterface } from './RepositoryInterface';
import { User } from '../models/User';

export class UserRepository implements RepositoryInterface<User> {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async where(query: any): Promise<User[]> {
    return this.users.filter(user =>
      Object.keys(query).every(key => user[key] === query[key])
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }
}