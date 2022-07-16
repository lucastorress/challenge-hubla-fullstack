import {
  classifiedTransactionsByProduct,
  classifiedTransactionsByProducts,
  detailsTransactionClassifiedByProduct,
  IRequestTransactionBatchDTO,
  IResponseTransactionBatchDTO,
  transactionValueByTypes,
} from './TransactionBatchDTO';
import ITransactionRepository from '../../repositories/ITransactionRepository';
import IProductRepository from '../../../product/repositories/IProductsRepository';
import IUserRepository from '../../../user/repositories/IUsersRepository';
import { Roles } from '../../../user/entities/User';
import { v4 as newUUID, validateUUID } from '../../../shared/helpers/UUID';
import { Transaction } from '../../entities/Transaction';
import { Product } from '../../../product/entities/Product';

type TransactionProduct = {
  transaction: Transaction;
  product: Product;
  seller: string;
};

export class UploadTransactionBatchUseCase {
  constructor(
    private repository: ITransactionRepository,
    private productRepository: IProductRepository,
    private userRepository: IUserRepository,
  ) {}

  public async execute(props: IRequestTransactionBatchDTO[]) {
    try {
      // Sort transactions by type ascending
      const transactions = await this.sortTransactionsByType(props);
      const batchId = newUUID;

      let transactionsToTransform;

      try {
        const transactionsProducts = await this.saveTransactions(
          transactions,
          batchId,
        );
        transactionsToTransform = transactionsProducts;
      } catch (error) {
        throw new Error(`Error during saving a transaction batch: ${error}`);
      }

      try {
        const transactionsClassified = await this.sortTransactionsByProduct(
          transactionsToTransform,
        );
        transactionsToTransform = transactionsClassified;
      } catch (error) {
        throw new Error(`Error during transaction batch sorting: ${error}`);
      }

      const totalValueByTypes = await this.calculateTotalValueByType(
        transactions,
      );

      const result: IResponseTransactionBatchDTO = {
        transactions:
          transactionsToTransform as classifiedTransactionsByProducts,
        totalValueByTypes,
        lengthOfTransactions: transactions.length,
      };

      return result;
    } catch (error) {
      throw new Error(`ErrorExecute ${error}`);
    } finally {
      this.repository.findAll();
      this.productRepository.findAll();
      this.userRepository.findAll();
    }
  }

  private async saveTransactions(
    transactions: IRequestTransactionBatchDTO[],
    batchId: string,
  ) {
    const transactionsSaved: TransactionProduct[] = [];

    if (validateUUID(batchId)) {
      // Try to save transactions in DB
      // We are using forOf 'cause this respect async calls
      for (let transaction of transactions) {
        // We have to check if product exists
        const searchProduct = await this.productRepository.findProductByTitle(
          transaction.productTitle,
        );
        // We have to check if seller exists
        const searchSeller = await this.userRepository.findByName(
          transaction.seller,
        );
        // Assuming that product was found, we reference this to reuse
        let product = searchProduct;
        // Assuming that seller was found, we reference this to reuse
        let seller = searchSeller;

        if (!searchProduct) {
          // If transaction type is 1, we can create product
          // 'cause we know producer name and can search by it
          if (transaction.type === 1) {
            // If producer user doesn't exists, we try to create it
            if (!searchSeller) {
              const userProps = {
                name: transaction.seller,
                role: Roles.PRODUCER,
              };
              try {
                seller = await this.userRepository.save(userProps);
              } catch (error) {
                throw new Error(
                  `Error while saving an user (type 1): ${error}`,
                );
              }
            }
            // Assuming that producer is ok
            // we can create product and associate it
            const productProps = {
              title: transaction.productTitle,
              producerId: seller.id,
            };
            try {
              product = await this.productRepository.save(productProps);
            } catch (error) {
              throw new Error(`Error while saving a product: ${error}`);
            }
          }
          // If transactions type is different of 1, we don't know the producer
          // Assuming that transactions array is sorted
          // And all products was already created
          else if (transaction.type !== 1) {
            throw new Error(
              `Product ${transaction.productTitle} isn't registered and it wasn't possible to create it.`,
            );
          }
        }
        // If we already have the product
        // We must check if transaction isn't type 1
        else {
          if (transaction.type !== 1) {
            if (!searchSeller) {
              const userProps = {
                name: transaction.seller,
                role: Roles.AFFILIATE,
              };
              try {
                seller = await this.userRepository.save(userProps);
              } catch (error) {
                throw new Error(
                  `Error while saving an user (type ${transaction.type}): ${error}`,
                );
              }
            }
          }
        }

        // We try to store transaction into database
        try {
          const transactionProps = {
            batchId,
            type: transaction.type,
            date: transaction.date,
            productId: product?.id,
            price: transaction.price,
            userId: seller?.id,
          };
          const transactionSaved = await this.repository.save(transactionProps);
          // Once we saved it, just push into list to return
          transactionsSaved.push({
            transaction: transactionSaved,
            product,
            seller: seller?.name,
          });
        } catch (error) {
          throw new Error(`Error during save a transaction: ${error}`);
        }

        // We check if transaction was a sell made by affiliate (type 2)
        // If it is, we associate this
        if (transaction.type === 2) {
          try {
            await this.userRepository.addRelationProducerAffiliate(
              product.producerId,
              seller?.id,
            );
          } catch (error) {
            throw new Error(
              `Error while saving a relation producerAffialiate: ${error}`,
            );
          }
        }
      }

      // Return a list of transactions saved
      return transactionsSaved;
    } else {
      throw Error(`The property batchId is not a valid UUID: ${batchId}`);
    }
  }

  private async calculateTotalValueByType(
    transactions: IRequestTransactionBatchDTO[],
  ) {
    const total: transactionValueByTypes = {
      producerSales: 0,
      affiliateSales: 0,
      commisionPaid: 0,
      comissionReceived: 0,
    };

    for (let transaction of transactions) {
      const { type } = transaction;
      if (type === 1) {
        total.producerSales += transaction.price;
      } else if (type === 2) {
        total.affiliateSales += transaction.price;
      } else if (type === 3) {
        total.commisionPaid += transaction.price;
      } else if (type === 4) {
        total.comissionReceived += transaction.price;
      }
    }

    return total;
  }

  private async sortTransactionsByType(
    transactions: IRequestTransactionBatchDTO[],
  ) {
    const A = transactions;
    return A.sort((a, b) => a.type - b.type);
  }

  private async sortTransactionsByProduct(
    transactionsProducts: TransactionProduct[],
  ) {
    const sorted: classifiedTransactionsByProducts = {
      products: [],
    };

    for (let transaction of transactionsProducts) {
      const productId = transaction.product.id;
      const productTitle = transaction.product.title;

      // Search if the product is already in the list
      const searchProduct = sorted.products.find(
        (product) => product.productId === productId,
      );

      // We'll use the details inside two occasions, so we declare this
      const { id: idTransaction, type, date, price } = transaction.transaction;

      const detailsTransaction: detailsTransactionClassifiedByProduct = {
        id: idTransaction,
        type,
        date,
        price,
        seller: {
          name: transaction.seller,
        },
      };

      // If product wasn't found, we must to create this into the list
      if (!searchProduct) {
        const product: classifiedTransactionsByProduct = {
          productId,
          productTitle,
          details: [detailsTransaction],
        };
        sorted.products.push(product);
      }
      // If product was found, we just add one more transaction in details list
      else {
        const position = sorted.products.findIndex(
          (product) => product.productId === searchProduct.productId,
        );
        sorted.products[position]['details'].push(detailsTransaction);
      }
    }

    return sorted;
  }
}
