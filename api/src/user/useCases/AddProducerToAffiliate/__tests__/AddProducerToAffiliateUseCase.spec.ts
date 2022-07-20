import InMemoryUsersRepositoryInstance from '../../../repositories/in-memory/InMemoryUsersRepository';
import IUserRepository from '../../../repositories/IUsersRepository';
import { CreateUserUseCase } from '../../CreateUser/CreateUserUseCase';
import { ICreateUserDTO } from '../../CreateUser/CreateUserDTO';
import { mockUser } from '../../../../shared/tests/mockUser';
import { Roles } from '../../../entities/User';
import { AddProducerToAffiliateUseCase } from '../AddProducerToAffiliateUseCase';

describe('Unit test: Add Producer to Affialiate [Use Case]', () => {
  let usersRepository: IUserRepository;
  let createUserCase: CreateUserUseCase;
  let addRelationUseCase: AddProducerToAffiliateUseCase;
  let user1;
  let user2;

  beforeAll(async () => {
    usersRepository = InMemoryUsersRepositoryInstance;
    createUserCase = new CreateUserUseCase(usersRepository);
    addRelationUseCase = new AddProducerToAffiliateUseCase(usersRepository);

    const user: ICreateUserDTO = {
      name: 'Lucas',
      email: 'lucas@email.com',
      password: '123',
      role: Roles.PRODUCER,
    };

    user1 = await createUserCase.execute(mockUser);
    user2 = await createUserCase.execute(user);
  });

  it('should be able to create a relation producer and affiliate between two users', async () => {
    const result = await addRelationUseCase.execute({
      producerId: user1.id,
      affiliateId: user2.id,
    });

    expect(result).toBe(true);
    expect(usersRepository.relations).toHaveLength(1);
    expect(usersRepository.relations[0]).toHaveProperty('producerId', user1.id);
    expect(usersRepository.relations[0]).toHaveProperty(
      'affiliateId',
      user2.id,
    );
  });

  it('should not to be able to create a relation producer and affiliate if producerId does not exists', async () => {
    const props = {
      producerId: 'error',
      affiliateId: user2.id,
    };
    await expect(addRelationUseCase.execute(props)).rejects.toEqual(
      new Error('User not found.'),
    );
  });

  it('should not to be able to create a relation producer and affiliate if affiliateId does not exists', async () => {
    const props = {
      producerId: user1.id,
      affiliateId: 'error',
    };
    await expect(addRelationUseCase.execute(props)).rejects.toEqual(
      new Error('User not found.'),
    );
  });
});
