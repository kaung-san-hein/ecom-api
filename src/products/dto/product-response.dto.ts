import { ProductEntity } from '../entities/product.entity';

export class ProductResponseDto extends ProductEntity {
  salePrice: number;
}
