import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../categories/entities/category.entity';
import { BrandEntity } from '../brands/entities/brand.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { UserEntity } from '../users/entities/user.entity';
import { OrderEntity } from '../orders/entities/order.entity';

export interface DashboardStats {
  totalCategories: number;
  totalBrands: number;
  totalActiveProducts: number;
  totalInactiveProducts: number;
  totalProducts: number;
  totalUsers: number;
  totalPendingOrders: number;
  totalConfirmedOrders: number;
  totalShippedOrders: number;
  totalDeliveredOrders: number;
  totalCancelledOrders: number;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async getDashboardStats(): Promise<DashboardStats> {
    const [
      totalCategories,
      totalBrands,
      totalActiveProducts,
      totalInactiveProducts,
      totalUsers,
      totalPendingOrders,
      totalConfirmedOrders,
      totalShippedOrders,
      totalDeliveredOrders,
      totalCancelledOrders,
    ] = await Promise.all([
      this.categoryRepository.count(),
      this.brandRepository.count(),
      this.productRepository.count({ where: { isActive: true } }),
      this.productRepository.count({ where: { isActive: false } }),
      this.userRepository.count(),
      this.orderRepository.count({ where: { status: 'pending' } }),
      this.orderRepository.count({ where: { status: 'confirmed' } }),
      this.orderRepository.count({ where: { status: 'shipped' } }),
      this.orderRepository.count({ where: { status: 'delivered' } }),
      this.orderRepository.count({ where: { status: 'cancelled' } }),
    ]);

    const totalProducts = totalActiveProducts + totalInactiveProducts;

    return {
      totalCategories,
      totalBrands,
      totalActiveProducts,
      totalInactiveProducts,
      totalProducts,
      totalUsers,
      totalPendingOrders,
      totalConfirmedOrders,
      totalShippedOrders,
      totalDeliveredOrders,
      totalCancelledOrders,
    };
  }
} 