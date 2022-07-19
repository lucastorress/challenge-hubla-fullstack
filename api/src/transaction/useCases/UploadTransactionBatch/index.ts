import UploadTransactionBatchController from './UploadTransactionBatchController';
import { UploadTransactionBatchUseCase } from './UploadTransactionBatchUseCase';
import { InMemoryTransactionsRepositoryInstance } from '../../../shared';
import { InMemoryProductsRepositoryInstance } from '../../../shared';
import { InMemoryUsersRepositoryInstance } from '../../../shared';

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
