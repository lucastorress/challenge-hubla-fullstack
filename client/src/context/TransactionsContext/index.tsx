import React, { createContext, useState, useContext, useMemo } from "react";
import {
  ClassifiedTransactionsByProduct,
  FunctionalComponent,
  Transactions,
} from "@types";

type TransactionsContextInterface = {
  data: Transactions;
  currentProduct: ClassifiedTransactionsByProduct;
  handleChangeData: (data: Transactions) => void;
  handleChangeCurrentProduct: (
    product: ClassifiedTransactionsByProduct
  ) => void;
};

const TransactionsContext = createContext({} as TransactionsContextInterface);

export const useTransactions = (): TransactionsContextInterface =>
  useContext(TransactionsContext);

function TransactionsProvider({ children }: FunctionalComponent): JSX.Element {
  const [transactions, setTransactions] = useState<Transactions>(
    {} as Transactions
  );

  const [currentProduct, setCurrentProduct] =
    useState<ClassifiedTransactionsByProduct>(
      {} as ClassifiedTransactionsByProduct
    );

  const handleChangeCurrentProduct = (
    product: ClassifiedTransactionsByProduct
  ): void => {
    setCurrentProduct(product);
  };

  const handleChangeData = (data: Transactions): void => {
    setTransactions(data);
  };

  const value = useMemo(
    () => ({
      data: transactions,
      handleChangeData,
      currentProduct,
      handleChangeCurrentProduct,
    }),
    [transactions, currentProduct]
  );
  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export { TransactionsProvider, TransactionsContext };
