import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CategoryEntity } from '../categories/entities/category.entity';
import { BrandEntity } from '../brands/entities/brand.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { UserEntity } from '../users/entities/user.entity';
import { OrderEntity } from '../orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity, 
      BrandEntity, 
      ProductEntity, 
      UserEntity, 
      OrderEntity
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {} 