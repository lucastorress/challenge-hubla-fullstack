import { Entity } from '@shared/Entity';
type TransactionProps = {
  id?: string;
  batchId?: string;
  type: number;
  date: Date;
  productId: string;
  price: number;
  userId: string;
};

class Transaction extends Entity<TransactionProps> {
  private constructor(props: TransactionProps, id?: string) {
    super(props, id);
  }

  static create(props: TransactionProps, id?: string) {
    const transaction = new Transaction(props, id);

    return transaction;
  }

  get batchId() {
    return this.props.batchId;
  }

  get type() {
    return this.props.type;
  }

  get date() {
    return this.props.date;
  }

  get productId() {
    return this.props.productId;
  }

  get price() {
    return this.props.price;
  }

  get userId() {
    return this.props.userId;
  }

  valueOf() {
    return {
      ...(this.id && { id: this.id }),
      ...this.props,
    };
  }
}

export { Transaction, TransactionProps };
