import IRepository from '@shared/IRepository';
import { Product, ProductProps } from '../entities/Product';

export default interface IProductRepository
  extends IRepository<ProductProps, Product> {
  findProductByProducer(producerId: string): Promise<Product | null>;
  findProductByTitle(title: string): Promise<Product | null>;
}
