import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import { AddProducerToAffiliateUseCase } from './AddProducerToAffiliateUseCase';
import AddProducerToAffiliateController from './AddProducerToAffiliateController';

const memoryUserRepository = InMemoryUsersRepositoryInstance;

const addProducerToAffiliateUseCase = new AddProducerToAffiliateUseCase(
  memoryUserRepository,
);

const addProducerToAffiliateController = new AddProducerToAffiliateController(
  addProducerToAffiliateUseCase,
);

export { addProducerToAffiliateUseCase, addProducerToAffiliateController };
