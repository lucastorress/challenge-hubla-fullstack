import InMemoryUsersRepositoryInstance from '../../../repositories/in-memory/InMemoryUsersRepository';
import IUserRepository from '../../../repositories/IUsersRepository';
import { UpdateUserUseCase } from '../UpdateUserUseCase';
import { CreateUserUseCase } from '../../CreateUser/CreateUserUseCase';
import { mockUser } from '../../../../shared/tests/mockUser';
import { IUpdateUserDTO } from '../UpdateUserDTO';
import { Roles } from '../../../entities/User';

describe('Unit test: Update User [Use Case]', () => {
  let usersRepository: IUserRepository;
  let updateUserCase: UpdateUserUseCase;
  let id: string;

  beforeAll(async () => {
    usersRepository = InMemoryUsersRepositoryInstance;
    updateUserCase = new UpdateUserUseCase(usersRepository);
    const createUserCase = new CreateUserUseCase(usersRepository);

    const user = await createUserCase.execute(mockUser);
    id = user.id;
  });

  it('should be able to update an user that already exists', async () => {
    const props: IUpdateUserDTO = {
      userId: id,
      body: {
        name: 'Username123',
        role: Roles.PRODUCER,
      },
    };
    const userUpdated = await updateUserCase.execute(props);
    expect(userUpdated).toHaveProperty('id', id);
    expect(userUpdated).toHaveProperty('name', 'Username123');
    expect(userUpdated.name).not.toBe(mockUser.name);
    expect(userUpdated).toHaveProperty('role', Roles.PRODUCER);
    expect(userUpdated.role).not.toBe(mockUser.role);
  });

  it('should not be able to update an user that dont exists', async () => {
    const props: IUpdateUserDTO = {
      userId: 'error',
      body: {
        name: 'Username123',
        role: Roles.PRODUCER,
      },
    };

    await expect(updateUserCase.execute(props)).rejects.toEqual(
      new Error('User not found.'),
    );
  });
});
