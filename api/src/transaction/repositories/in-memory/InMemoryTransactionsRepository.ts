import { Transaction, TransactionProps } from '../../entities/Transaction';
import ITransactionRepository from '../ITransactionRepository';

class InMemoryTransactionsRepository implements ITransactionRepository {
  private static instance: InMemoryTransactionsRepository;
  public items: Transaction[];

  private constructor() {
    this.items = [];
  }

  public static getInstance(): InMemoryTransactionsRepository {
    if (!InMemoryTransactionsRepository.instance) {
      InMemoryTransactionsRepository.instance =
        new InMemoryTransactionsRepository();
    }

    return InMemoryTransactionsRepository.instance;
  }

  async findAll() {
    console.log('Transactions:');
    for (let item of this.items) {
      console.log(item.valueOf());
    }
    console.log('Lenght:', this.items.length);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = this.items.find((transaction) => transaction.id === id);

    if (!transaction) {
      return null;
    }

    return transaction;
  }

  async save(transaction: TransactionProps): Promise<Transaction> {
    const newTransaction = Transaction.create(transaction);
    this.items.push(newTransaction);
    return newTransaction;
  }

  async update(
    id: string,
    transaction: TransactionProps,
  ): Promise<Transaction> {
    const transactionIndex = this.items.findIndex(
      (transaction) => transaction.id === id,
    );
    const transactionUpdated = Transaction.create(transaction);
    this.items[transactionIndex] = transactionUpdated;
    return transactionUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const transactionIndex = this.items.findIndex(
      (transaction) => transaction.id === id,
    );

    if (transactionIndex > -1) {
      this.items.splice(transactionIndex, 1);
      return true;
    }

    return false;
  }
}

export default InMemoryTransactionsRepository.getInstance();
