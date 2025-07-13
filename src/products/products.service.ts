import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Repository, Like, Between, FindManyOptions } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check if SKU already exists if provided
    if (createProductDto.sku) {
      const existingProduct = await this.productsRepository.findOne({
        where: { sku: createProductDto.sku },
      });
      if (existingProduct) {
        throw new BadRequestException('Product with this SKU already exists');
      }
    }

    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAll(queryDto: QueryProductDto) {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      isActive,
      page,
      limit,
      sortBy = 'createdAt', // ✅ default sort field
      sortOrder = 'DESC', // ✅ default sort direction
    } = queryDto;

    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (brand) {
      queryBuilder.andWhere('product.brand = :brand', { brand });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('product.isActive = :isActive', { isActive });
    }

    // Apply sorting
    queryBuilder.orderBy(`product.${sortBy}`, sortOrder);

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [products, total] = await queryBuilder.getManyAndCount();

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findBySku(sku: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { sku } });
    if (!product) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Check if product exists
    const product = await this.findOne(id);

    // Check if SKU already exists if being updated
    if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
      const existingProduct = await this.productsRepository.findOne({
        where: { sku: updateProductDto.sku },
      });
      if (existingProduct) {
        throw new BadRequestException('Product with this SKU already exists');
      }
    }

    await this.productsRepository.update(id, updateProductDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);

    if (product.stock + quantity < 0) {
      throw new BadRequestException('Insufficient stock');
    }

    product.stock += quantity;
    return await this.productsRepository.save(product);
  }

  async getCategories(): Promise<string[]> {
    const result = await this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .where('product.category IS NOT NULL')
      .getRawMany();

    return result.map((item) => item.category);
  }

  async getBrands(): Promise<string[]> {
    const result = await this.productsRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.brand', 'brand')
      .where('product.brand IS NOT NULL')
      .getRawMany();

    return result.map((item) => item.brand);
  }

  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
    return await this.productsRepository
      .find({
        where: { isActive: true },
        order: { stock: 'ASC' },
      })
      .then((products) => products.filter((p) => p.stock <= threshold));
  }
}
