import InMemoryUsersRepositoryInstance from '../../../repositories/in-memory/InMemoryUsersRepository';
import IUserRepository from '../../../repositories/IUsersRepository';
import { CreateUserUseCase } from '../CreateUserUseCase';
import { ICreateUserDTO } from '../CreateUserDTO';
import { mockUser } from '../../../../shared/tests/mockUser';
import { Roles } from '../../../entities/User';

describe('Unit test: Create User [Use Case]', () => {
  let usersRepository: IUserRepository;
  let createUserCase: CreateUserUseCase;

  beforeAll(() => {
    usersRepository = InMemoryUsersRepositoryInstance;
    createUserCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserCase.execute(mockUser);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name', 'Username');
    expect(user).toHaveProperty('email', 'username@email.com');
    expect(user).toHaveProperty('password', '123');
  });

  it('should not to be able to create a user with an email that already exists', async () => {
    const user: ICreateUserDTO = {
      name: 'Lucas',
      email: mockUser.email,
      password: '123',
      role: Roles.PRODUCER,
    };

    await expect(createUserCase.execute(user)).rejects.toEqual(
      new Error('User already registered. Try another email.'),
    );
  });
});
