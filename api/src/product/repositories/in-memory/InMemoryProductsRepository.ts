import { Product, ProductProps } from '../../entities/Product';
import IProductsRepository from '../IProductsRepository';

class InMemoryProductsRepository implements IProductsRepository {
  private static instance: InMemoryProductsRepository;
  public items: Product[];

  private constructor() {
    this.items = [];
  }

  public static getInstance(): InMemoryProductsRepository {
    if (!InMemoryProductsRepository.instance) {
      InMemoryProductsRepository.instance = new InMemoryProductsRepository();
    }

    return InMemoryProductsRepository.instance;
  }

  async findAll() {
    console.log('Products:');
    for (let item of this.items) {
      console.log(item.valueOf());
    }
    console.log('Lenght:', this.items.length);
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    return product;
  }

  async findProductByProducer(producerId: string): Promise<Product> {
    const product = this.items.find(
      (product) => product.producerId === producerId,
    );

    if (!product) {
      return null;
    }

    return product;
  }

  async findProductByTitle(title: string): Promise<Product> {
    const product = this.items.find((product) => product.title === title);

    if (!product) {
      return null;
    }

    return product;
  }

  async save(product: ProductProps): Promise<Product> {
    const newProduct = Product.create(product);
    this.items.push(newProduct);
    return newProduct;
  }

  async update(id: string, product: ProductProps): Promise<Product> {
    const productIndex = this.items.findIndex((product) => product.id === id);
    const productUpdated = Product.create(product);
    this.items[productIndex] = productUpdated;
    return productUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const productIndex = this.items.findIndex((product) => product.id === id);

    if (productIndex > -1) {
      this.items.splice(productIndex, 1);
      return true;
    }

    return false;
  }
}

export default InMemoryProductsRepository.getInstance();
