import InMemoryUsersRepositoryInstance from '../../../repositories/in-memory/InMemoryUsersRepository';
import IUserRepository from '../../../repositories/IUsersRepository';
import { DeleteUserUseCase } from '../DeleteUserUseCase';
import { CreateUserUseCase } from '../../CreateUser/CreateUserUseCase';
import { mockUser } from '../../../../shared/tests/mockUser';

describe('Unit test: Delete User [Use Case]', () => {
  let usersRepository: IUserRepository;
  let deleteUserCase: DeleteUserUseCase;
  let id: string;

  beforeAll(async () => {
    usersRepository = InMemoryUsersRepositoryInstance;
    deleteUserCase = new DeleteUserUseCase(usersRepository);
    const createUserCase = new CreateUserUseCase(usersRepository);

    const user = await createUserCase.execute(mockUser);
    id = user.id;
  });

  it('should be able to delete an user that already exists', async () => {
    const userDeleted = await deleteUserCase.execute({ id });
    expect(userDeleted).toBe(true);
  });

  it('should not be able to delete an user that dont exists', async () => {
    const userDeleted = await deleteUserCase.execute({ id });
    expect(userDeleted).toBe(false);
  });
});
