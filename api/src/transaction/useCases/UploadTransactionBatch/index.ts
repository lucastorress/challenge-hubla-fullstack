import UploadTransactionBatchController from './UploadTransactionBatchController';
import { UploadTransactionBatchUseCase } from './UploadTransactionBatchUseCase';
import { InMemoryTransactionsRepositoryInstance } from '../../../shared';
import { InMemoryProductsRepositoryInstance } from '../../../shared';
import { InMemoryUsersRepositoryInstance } from '../../../shared';

/**
 * Basically, we have this file to instantiate all modules that we neet
 * To export just what we will use in other layers
 */

const memoryTransactionRepository = InMemoryTransactionsRepositoryInstance;
const memoryProductRepository = InMemoryProductsRepositoryInstance;
const memoryUserRepository = InMemoryUsersRepositoryInstance;

const uploadTransactionBatchUseCase = new UploadTransactionBatchUseCase(
  memoryTransactionRepository,
  memoryProductRepository,
  memoryUserRepository,
);

const uploadTransactionBatchController = new UploadTransactionBatchController(
  uploadTransactionBatchUseCase,
);

export { uploadTransactionBatchUseCase, uploadTransactionBatchController };
