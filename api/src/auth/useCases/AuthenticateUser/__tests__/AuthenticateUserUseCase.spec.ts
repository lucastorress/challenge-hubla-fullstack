import { mockUser } from '../../../../shared/tests/mockUser';
import IUserRepository from '../../../../user/repositories/IUsersRepository';
import { InMemoryUsersRepositoryInstance } from '../../../../shared';
import { CreateUserUseCase } from '../../../../user/useCases/CreateUser/CreateUserUseCase';
import { IAuthenticateUserDTO } from '../AuthenticateUserDTO';
import { AuthenticateUserUseCase } from '../AuthenticateUserUseCase';

describe('Unit test: Authenticate User [Use Case]', () => {
  let usersRepository: IUserRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeAll(async () => {
    usersRepository = InMemoryUsersRepositoryInstance;
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    const createUserCase = new CreateUserUseCase(usersRepository);
    await createUserCase.execute(mockUser);
  });

  it('should be able to authenticate user registered', async () => {
    const body: IAuthenticateUserDTO = {
      email: mockUser.email,
      password: mockUser.password,
    };

    const user = await authenticateUserUseCase.execute(body);
    expect(user).toHaveProperty('id');
  });

  it('should not be able to authenticate user registered with wrong password', async () => {
    const body: IAuthenticateUserDTO = {
      email: mockUser.email,
      password: 'wrongpassword',
    };

    await expect(authenticateUserUseCase.execute(body)).rejects.toEqual(
      new Error('User not authorized.'),
    );
  });

  it('should not be able to authenticate user unregistered', async () => {
    const body: IAuthenticateUserDTO = {
      email: 'wrongemail@gmail.com',
      password: 'wrongpassword',
    };

    await expect(authenticateUserUseCase.execute(body)).rejects.toEqual(
      new Error('User not registered.'),
    );
  });
});
