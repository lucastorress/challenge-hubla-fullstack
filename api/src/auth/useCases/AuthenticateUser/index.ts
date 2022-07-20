import InMemoryUsersRepositoryInstance from '../../../user/repositories/in-memory/InMemoryUsersRepository';
import AuthenticateUserController from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;

const authenticateUserUseCase = new AuthenticateUserUseCase(
  memoryUserRepository,
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
);

export { authenticateUserUseCase, authenticateUserController };
