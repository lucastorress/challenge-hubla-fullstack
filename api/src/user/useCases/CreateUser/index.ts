import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;
const createUserUseCase = new CreateUserUseCase(memoryUserRepository);

export { createUserUseCase };
