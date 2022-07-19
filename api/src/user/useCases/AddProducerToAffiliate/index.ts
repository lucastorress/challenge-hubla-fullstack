import InMemoryUsersRepositoryInstance from '../../repositories/in-memory/InMemoryUsersRepository';
import { AddProducerToAffiliateUseCase } from './AddProducerToAffiliateUseCase';

const memoryUserRepository = InMemoryUsersRepositoryInstance;
const addProducerToAffiliateUseCase = new AddProducerToAffiliateUseCase(
  memoryUserRepository,
);

export { addProducerToAffiliateUseCase };
