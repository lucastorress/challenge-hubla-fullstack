import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import CreateUserController from './CreateUserController';

const memoryUserRepository = InMemoryUsersRepositoryInstance;
const createUserUseCase = new CreateUserUseCase(memoryUserRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
