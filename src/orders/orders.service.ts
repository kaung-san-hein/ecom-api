import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderReportDto } from './dto/report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class OrdersService {
  private readonly domainPrefix = process.env.DOMAIN_URL || 'http://localhost:3000';

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private transformPaymentImage(paymentImage: string): string {
    if (!paymentImage) return null;
    return `${this.domainPrefix}/${paymentImage}`;
  }

  private transformOrder(order: OrderEntity): OrderEntity {
    if (order.payment_image) {
      order.payment_image = this.transformPaymentImage(order.payment_image);
    }
    return order;
  }

  private transformOrders(orders: OrderEntity[]): OrderEntity[] {
    return orders.map(order => this.transformOrder(order));
  }

  async create(createOrderDto: CreateOrderDto & { payment_image: string | null }, userId: number): Promise<OrderEntity> {
    // Calculate total and validate products
    let total = 0;
    const orderItems: Partial<OrderItemEntity>[] = [];

    for (const item of createOrderDto.orderItems) {
      const product = await this.productRepository.findOne({
        where: { id: item.product_id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${item.product_id} not found!`);
      }

      if (product.stock < item.quantity) {
        throw new NotFoundException(`Insufficient stock for product ${product.name}!`);
      }

      const subtotal = product.price * item.quantity;
      total += subtotal;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        subtotal,
      });
    }

    // Create order
    const order = this.orderRepository.create({
      date: new Date(createOrderDto.date),
      payment_image: createOrderDto.payment_image,
      phone: createOrderDto.phone,
      address: createOrderDto.address,
      total,
      user_id: userId,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    const savedOrderItems = await Promise.all(
      orderItems.map(item => {
        const orderItem = this.orderItemRepository.create({
          ...item,
          order_id: savedOrder.id,
        });
        return this.orderItemRepository.save(orderItem);
      })
    );

    // Update product stock
    for (const item of createOrderDto.orderItems) {
      await this.productRepository
        .createQueryBuilder()
        .update(ProductEntity)
        .set({ stock: () => `stock - ${item.quantity}` })
        .where('id = :id', { id: item.product_id })
        .execute();
    }

    // Fetch complete order with relationships
    const completeOrder = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });

    return this.transformOrder(completeOrder);
  }

  async findAll(userId?: number): Promise<OrderEntity[]> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product');

    if (userId) {
      queryBuilder.where('order.user_id = :userId', { userId });
    }

    queryBuilder.orderBy('order.createdAt', 'DESC');

    const orders = await queryBuilder.getMany();
    return this.transformOrders(orders);
  }

  async findOne(id: number, userId?: number): Promise<OrderEntity> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .where('order.id = :id', { id });

    if (userId) {
      queryBuilder.andWhere('order.user_id = :userId', { userId });
    }

    const order = await queryBuilder.getOne();

    if (!order) {
      throw new NotFoundException('Order not found!');
    }

    return this.transformOrder(order);
  }

  async update(id: number, updateOrderDto: Partial<UpdateOrderDto>, userId?: number): Promise<OrderEntity> {
    const order = await this.findOne(id, userId);

    // Update order fields - only phone, address, and payment_image
    const updateData: Partial<OrderEntity> = {};

    if (updateOrderDto.phone !== undefined) {
      updateData.phone = updateOrderDto.phone;
    }

    if (updateOrderDto.address !== undefined) {
      updateData.address = updateOrderDto.address;
    }

    if (updateOrderDto.payment_image !== undefined) {
      updateData.payment_image = updateOrderDto.payment_image;
    }

    if (Object.keys(updateData).length > 0) {
      await this.orderRepository.update(id, updateData);
    }

    // Fetch updated order
    const updatedOrder = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });

    return this.transformOrder(updatedOrder);
  }

  async updateStatus(id: number, status: string, userId?: number): Promise<OrderEntity> {
    const order = await this.findOne(id, userId);
    
    await this.orderRepository.update(id, { status });
    
    const updatedOrder = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });

    return this.transformOrder(updatedOrder);
  }

  async remove(id: number, userId?: number) {
    const order = await this.findOne(id, userId);
    
    // Delete payment image if exists
    if (order.payment_image) {
      const fullPath = path.join(process.cwd(), order.payment_image);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    
    return await this.orderRepository.delete(order.id);
  }

  async getReport(): Promise<OrderReportDto> {
    // Get current year
    const currentYear = new Date().getFullYear();
    const years = [2023, 2024, 2025];
    
    // Initialize report data structure
    const report = {
      monthlyOrders: {},
      monthlyRevenue: {},
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      topProducts: [],
      orderStatusDistribution: {},
      recentOrders: [],
      yearlyComparison: {}
    };





    // Get monthly orders and revenue for each year
    for (const year of years) {
      // Initialize year data
      report.monthlyOrders[year] = Array(12).fill(0);
      report.monthlyRevenue[year] = Array(12).fill(0);

      // Get all orders and filter by year in JavaScript
      const allOrders = await this.orderRepository
        .createQueryBuilder('order')
        .select(['order.date', 'order.total'])
        .getMany();

      // Filter orders for this year
      const yearOrders = allOrders.filter(order => {
        const orderYear = new Date(order.date).getFullYear();
        return orderYear === year;
      });

      if (yearOrders.length > 0) {
        
        // Manually group by month
        const monthlyGroups: { [key: number]: { count: number; revenue: number } } = {};
        yearOrders.forEach(order => {
          const month = new Date(order.date).getMonth(); // 0-11
          if (!monthlyGroups[month]) {
            monthlyGroups[month] = {
              count: 0,
              revenue: 0
            };
          }
          monthlyGroups[month].count++;
          monthlyGroups[month].revenue += Number(order.total) || 0;
        });

        // Populate the arrays
        for (let month = 0; month < 12; month++) {
          if (monthlyGroups[month]) {
            report.monthlyOrders[year][month] = monthlyGroups[month].count;
            report.monthlyRevenue[year][month] = monthlyGroups[month].revenue;
          }
        }
      }
    }

    // Get overall statistics using a simpler approach
    try {
      const totalOrders = await this.orderRepository.count();
      const allOrders = await this.orderRepository.find({ select: ['total'] });
      
      const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      
      report.totalOrders = totalOrders;
      report.totalRevenue = totalRevenue;
      report.averageOrderValue = averageOrderValue;
    } catch (error) {
      console.error('Error calculating overall statistics:', error);
      // Set default values if there's an error
      report.totalOrders = 0;
      report.totalRevenue = 0;
      report.averageOrderValue = 0;
    }



    // Get top selling products
    try {
      const topProducts = await this.orderItemRepository
        .createQueryBuilder('orderItem')
        .leftJoin('orderItem.product', 'product')
        .select([
          'product.name as productName',
          'SUM(orderItem.quantity) as totalQuantity',
          'SUM(orderItem.subtotal) as totalRevenue'
        ])
        .groupBy('product.id, product.name')
        .orderBy('totalQuantity', 'DESC')
        .limit(10)
        .getRawMany();

      report.topProducts = topProducts
        .filter(item => item.productName && item.totalQuantity)
        .map(item => ({
          name: item.productName,
          quantity: parseInt(item.totalQuantity) || 0,
          revenue: parseFloat(item.totalRevenue) || 0
        }));
    } catch (error) {
      console.error('Error fetching top products:', error);
      report.topProducts = [];
    }

    // Get order status distribution
    const statusDistribution = await this.orderRepository
      .createQueryBuilder('order')
      .select([
        'order.status as status',
        'COUNT(order.id) as count'
      ])
      .groupBy('order.status')
      .getRawMany();

    statusDistribution.forEach(item => {
      if (item.status && item.count) {
        report.orderStatusDistribution[item.status] = parseInt(item.count) || 0;
      }
    });

    // Get recent orders (last 10)
    const recentOrders = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .select([
        'order.id as id',
        'order.date as date',
        'order.total as total',
        'order.status as status',
        'user.name as customerName'
      ])
      .orderBy('order.createdAt', 'DESC')
      .limit(10)
      .getRawMany();

    report.recentOrders = recentOrders
      .filter(order => order.id && order.date)
      .map(order => ({
        id: order.id,
        date: order.date,
        total: parseFloat(order.total) || 0,
        status: order.status || 'pending',
        customerName: order.customerName || 'Unknown'
      }));

    // Get year-over-year comparison
    const yearlyData = {};
    
    // Get all orders and filter by years in JavaScript
    const allOrdersForComparison = await this.orderRepository
      .createQueryBuilder('order')
      .select(['order.date', 'order.total'])
      .getMany();

    // Filter orders for the specified years
    const filteredOrders = allOrdersForComparison.filter(order => {
      const orderYear = new Date(order.date).getFullYear();
      return years.includes(orderYear);
    });

    // Manually group by year
    const yearlyGroups: { [key: number]: { orders: number; revenue: number } } = {};
    filteredOrders.forEach(order => {
      const year = new Date(order.date).getFullYear();
      if (!yearlyGroups[year]) {
        yearlyGroups[year] = {
          orders: 0,
          revenue: 0
        };
      }
      yearlyGroups[year].orders++;
      yearlyGroups[year].revenue += Number(order.total) || 0;
    });

    // Populate yearly data
    years.forEach(year => {
      yearlyData[year] = {
        orders: yearlyGroups[year]?.orders || 0,
        revenue: yearlyGroups[year]?.revenue || 0
      };
    });

    report.yearlyComparison = yearlyData;

    return report;
  }
} 