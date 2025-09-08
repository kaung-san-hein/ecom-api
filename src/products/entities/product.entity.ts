import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountPercentage: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @ManyToOne(() => CategoryEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ nullable: true })
  category_id: number;

  @ManyToOne(() => BrandEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @Column({ nullable: true })
  brand_id: number;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
} 