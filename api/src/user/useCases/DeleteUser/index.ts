import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import DeleteUserController from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;

const deleteUserUseCase = new DeleteUserUseCase(memoryUserRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
