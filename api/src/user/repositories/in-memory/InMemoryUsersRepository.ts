import { Roles, User, UserProps } from '../../entities/User';
import IUsersRepository from '../IUsersRepository';

type ProducerAffiliate = {
  producerId: string;
  affiliateId: string;
};

class InMemoryUsersRepository implements IUsersRepository {
  private static instance: InMemoryUsersRepository;
  public items: User[];
  public relations: ProducerAffiliate[];

  private constructor() {
    this.items = [];
    this.relations = [];
  }

  public static getInstance(): InMemoryUsersRepository {
    if (!InMemoryUsersRepository.instance) {
      InMemoryUsersRepository.instance = new InMemoryUsersRepository();
    }

    return InMemoryUsersRepository.instance;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByName(name: string): Promise<User | null> {
    const user = this.items.find((user) => user.name === name);

    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: UserProps): Promise<User> {
    const newUser = User.create(user);
    this.items.push(newUser);
    return newUser;
  }

  async update(id: string, user: UserProps): Promise<User> {
    const userIndex = this.items.findIndex((user) => user.id === id);
    const userUpdated = User.create(user);
    this.items[userIndex] = userUpdated;
    return userUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const userIndex = this.items.findIndex((user) => user.id === id);

    if (userIndex > -1) {
      this.items.splice(userIndex, 1);
      return true;
    }

    return false;
  }

  async addRelationProducerAffiliate(
    producerId: string,
    affiliateId: string,
  ): Promise<boolean> {
    const newRelation: ProducerAffiliate = {
      producerId,
      affiliateId,
    };

    this.relations.push(newRelation);
    return true;
  }
}

export default InMemoryUsersRepository.getInstance();
