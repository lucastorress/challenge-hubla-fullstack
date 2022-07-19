import fs = require('fs/promises');
import path = require('path');

import {
  InMemoryProductsRepositoryInstance,
  InMemoryTransactionsRepositoryInstance,
  InMemoryUsersRepositoryInstance,
} from '../../../../shared';

import { UploadTransactionBatchUseCase } from '../UploadTransactionBatchUseCase';
import UploadTransactionBatchController from '../UploadTransactionBatchController';

import { IResponseTransactionBatchDTO } from '../TransactionBatchDTO';
import { transactionFileProperties as transform } from '../TransactionTransform';

const DOCS = ['..', '..', '..', '..', '..', '..', 'docs'];

describe('Unit test: Upload Transaction Batch [Step by step]', () => {
  let batch: string;
  let memoryTransactionRepository;
  let memoryProductRepository;
  let memoryUserRepository;
  let useCase: UploadTransactionBatchUseCase;
  let controller: UploadTransactionBatchController;
  let callUseCase: IResponseTransactionBatchDTO;

  beforeAll(async () => {
    try {
      batch = await fs.readFile(
        `${path.join(__dirname, ...DOCS, 'PRODUCTS.txt')}`,
        {
          encoding: 'utf8',
        },
      );
    } catch (error) {
      console.error(error);
    }
  });

  beforeEach(() => {
    memoryTransactionRepository = InMemoryTransactionsRepositoryInstance;
    memoryProductRepository = InMemoryProductsRepositoryInstance;
    memoryUserRepository = InMemoryUsersRepositoryInstance;
    useCase = new UploadTransactionBatchUseCase(
      memoryTransactionRepository,
      memoryProductRepository,
      memoryUserRepository,
    );
    controller = new UploadTransactionBatchController(useCase);
  });

  it('should verify if the PRODUCTS.txt mock have 20 transactions, each one having size of maximum 86 caracteres', () => {
    const transactionChunks = controller.splitStringIntoEqualPieces(
      batch,
      transform.properties.totalSize,
    );
    expect(transactionChunks).toHaveLength(20);
    expect(transactionChunks[0].length).toBeLessThanOrEqual(86);
  });

  it('should verify if we have 20 transactions inside PRODUCTS.txt and the properties was inject in transaction object before pass to use case', () => {
    const transactionChunks = controller.splitStringIntoEqualPieces(
      batch,
      transform.properties.totalSize,
    );

    const transactions =
      controller.manipulateStringToDataObject(transactionChunks);

    expect(transactions).toHaveLength(20);
    expect(transactions[0]).toHaveProperty('type');
    expect(transactions[0]).toHaveProperty('date');
    expect(transactions[0]).toHaveProperty('productTitle');
    expect(transactions[0]).toHaveProperty('price');
    expect(transactions[0]).toHaveProperty('seller');
  });

  it('should verify if we have 3 products inside the transactions in PRODUCTS.txt', async () => {
    const transactionChunks = controller.splitStringIntoEqualPieces(
      batch,
      transform.properties.totalSize,
    );

    const transactions =
      controller.manipulateStringToDataObject(transactionChunks);

    callUseCase = await useCase.execute(transactions);

    expect(callUseCase.transactions.products).toHaveLength(3);
  });

  it('should verify if we have properties: productId, productTitle and details; inside the classified transactions by product object returned by use case', async () => {
    expect(callUseCase.transactions.products[0]).toHaveProperty('productId');
    expect(callUseCase.transactions.products[0]).toHaveProperty('productTitle');
    expect(callUseCase.transactions.products[0]).toHaveProperty('details');
  });

  it('should verify if we have stored 20 transactions, 3 products and 7 users coming from PRODUCTS.txt', async () => {
    expect(memoryTransactionRepository.items).toHaveLength(20);
    expect(memoryProductRepository.items).toHaveLength(3);
    expect(memoryUserRepository.items).toHaveLength(7);
  });
});
