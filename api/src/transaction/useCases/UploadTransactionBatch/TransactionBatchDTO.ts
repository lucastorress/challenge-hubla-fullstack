import { TransactionProps } from '../../entities/Transaction';

/**
 * At DTO modules, we just create interfaces/types to prepare other layers
 * Those will use the data and need to know which info will receive
 * As we can see, the types are minimum to be more malleable when called itself
 */

type TransactionLite = Omit<
  TransactionProps,
  'id' | 'batchId' | 'productId' | 'userId'
>;

export type transactionValueByTypes = {
  producerSales: number;
  affiliateSales: number;
  commisionPaid: number;
  commissionReceived: number;
};

export type detailsTransactionClassifiedByProduct = {
  id: string;
  type: number;
  date: Date;
  price: number;
  seller: string;
};

export type classifiedTransactionsByProduct = {
  productId: string;
  productTitle: string;
  details: detailsTransactionClassifiedByProduct[];
};

export type classifiedTransactionsByProducts = {
  products: classifiedTransactionsByProduct[];
};

export interface IRequestTransactionBatchDTO extends TransactionLite {
  productTitle: string;
  seller: string;
}

export interface IResponseTransactionBatchDTO {
  transactions: classifiedTransactionsByProducts;
  totalValueByTypes: transactionValueByTypes;
  lengthOfTransactions: number;
}
