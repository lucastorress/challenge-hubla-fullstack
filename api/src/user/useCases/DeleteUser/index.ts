import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;
const deleteUserUseCase = new DeleteUserUseCase(memoryUserRepository);

export { deleteUserUseCase };
