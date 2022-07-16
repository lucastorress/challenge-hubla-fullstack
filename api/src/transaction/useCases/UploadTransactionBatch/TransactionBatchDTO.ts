import { TransactionProps } from '../../entities/Transaction';

type TransactionLite = Omit<
  TransactionProps,
  'id' | 'batchId' | 'productId' | 'userId'
>;

export type transactionValueByTypes = {
  producerSales: number;
  affiliateSales: number;
  commisionPaid: number;
  comissionReceived: number;
};

export type detailsTransactionClassifiedByProduct = {
  id: string;
  type: number;
  date: Date;
  price: number;
  seller: {
    name: string;
  };
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
