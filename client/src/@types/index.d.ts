import { ReactNode } from "react";

declare type FunctionalComponent = {
  children: ReactNode;
};

type DetailsTransactionClassifiedByProduct = {
  id: string;
  type: number;
  date: Date;
  price: number;
  seller: string;
};

export type ClassifiedTransactionsByProduct = {
  productId: string;
  productTitle: string;
  details: DetailsTransactionClassifiedByProduct[];
};

type ClassifiedTransactionsByProducts = {
  products: ClassifiedTransactionsByProduct[];
};

type TransactionValueByTypes = {
  producerSales: number;
  affiliateSales: number;
  commisionPaid: number;
  commissionReceived: number;
};

declare type Transactions = {
  transactions: ClassifiedTransactionsByProducts;
  totalValueByTypes: TransactionValueByTypes;
  lengthOfTransactions: number;
};
