export interface RepositoryInterface<T> {
  save(item: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  where(query: any): Promise<T[]>;
}