import { Entity } from '../../shared/Entity';

type ProductProps = {
  id?: string;
  title: string;
  producerId: string;
};

class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  static create(props: ProductProps, id?: string) {
    const product = new Product(props, id);

    return product;
  }

  get title() {
    return this.props.title;
  }

  get producerId() {
    return this.props.producerId;
  }

  valueOf() {
    return {
      ...(this.id && { id: this.id }),
      ...this.props,
    };
  }
}

export { Product, ProductProps };
