import { User, UserProps } from '../entities/User';
import IRepository from '../../shared/IRepository';

export default interface IUserRepository extends IRepository<UserProps, User> {
  findByEmail(email: string): Promise<User | null>;
}
