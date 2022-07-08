import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;
const updateUserUseCase = new UpdateUserUseCase(memoryUserRepository);

export { updateUserUseCase };
