import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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

  async create(createOrderDto: CreateOrderDto & { payment_image: string }, userId: number): Promise<OrderEntity> {
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

    // Update order fields
    const updateData: Partial<OrderEntity> = {};
    
    if (updateOrderDto.date) {
      updateData.date = new Date(updateOrderDto.date);
    }
    
    if (updateOrderDto.payment_image) {
      updateData.payment_image = updateOrderDto.payment_image;
    }

    if (updateOrderDto.phone) {
      updateData.phone = updateOrderDto.phone;
    }

    if (updateOrderDto.address) {
      updateData.address = updateOrderDto.address;
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
} 