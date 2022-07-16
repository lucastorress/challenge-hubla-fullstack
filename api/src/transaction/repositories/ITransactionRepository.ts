import IRepository from '../../shared/IRepository';
import { Transaction, TransactionProps } from '../entities/Transaction';

export default interface ITransactionRepository
  extends IRepository<TransactionProps, Transaction> {}
