import UploadTransactionBatchController from './UploadTransactionBatchController';
import { UploadTransactionBatchUseCase } from './UploadTransactionBatchUseCase';
import { InMemoryTransactionsRepositoryInstance } from '@shared/index';
import { InMemoryProductsRepositoryInstance } from '@shared/index';
import { InMemoryUsersRepositoryInstance } from '@shared/index';

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
