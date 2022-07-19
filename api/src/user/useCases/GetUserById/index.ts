import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import GetUserController from './GetUserByIdController';
import { GetUserUseCase } from './GetUserUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;

const getUserUseCase = new GetUserUseCase(memoryUserRepository);

const getUserController = new GetUserController(getUserUseCase);

export { getUserUseCase, getUserController };
