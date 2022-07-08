import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import { GetUserUseCase } from './GetUserUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;

const getUserUseCase = new GetUserUseCase(memoryUserRepository);

export { getUserUseCase };
