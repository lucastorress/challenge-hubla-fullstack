export default interface IRepository<P, T> {
  findById(id: string): Promise<T | null>;
  save(props: P): Promise<T>;
  update(id: string, props: P): Promise<T>;
  remove(id: string): Promise<boolean>;
}
