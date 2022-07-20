import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import UpdateUserController from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;

const updateUserUseCase = new UpdateUserUseCase(memoryUserRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
