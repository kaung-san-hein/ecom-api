import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryProductDto } from './dto/query-product.dto';
import { CreateProductWithImagesDto } from './dto/create-product-with-images.dto';
import { UpdateProductWithImagesDto } from './dto/update-product-with-images.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private readonly domainPrefix = process.env.DOMAIN_URL || 'http://localhost:3000';

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private transformImages(images: string[]): string[] {
    if (!images || images.length === 0) return [];
    return images.map(image => `${this.domainPrefix}/${image}`);
  }

  private calculateSalePrice(price: number, discountPercentage?: number): number {
    if (!discountPercentage || discountPercentage <= 0) {
      return price;
    }
    
    const discountAmount = (price * discountPercentage) / 100;
    const salePrice = price - discountAmount;
    
    // Round to 2 decimal places
    return Math.round(salePrice * 100) / 100;
  }

  private transformProduct(product: ProductEntity): ProductResponseDto {
    const response: ProductResponseDto = {
      ...product,
      images: product.images ? this.transformImages(product.images) : [],
      salePrice: this.calculateSalePrice(product.price, product.discountPercentage),
    };
    return response;
  }

  private transformProducts(products: ProductEntity[]): ProductResponseDto[] {
    return products.map(product => this.transformProduct(product));
  }

  async create(
    createProductDto: CreateProductWithImagesDto,
    files: Express.Multer.File[],
  ): Promise<ProductResponseDto> {
    const imagePaths: string[] = [];
    
    if (files && files.length > 0) {
      for (const file of files) {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        const filePath = path.join('uploads/images/products', fileName);
        const fullPath = path.join(process.cwd(), filePath);
        
        // Ensure directory exists
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write file
        fs.writeFileSync(fullPath, file.buffer);
        imagePaths.push(filePath);
      }
    }

    // Convert boolean strings to actual booleans
    const processedDto = {
      ...createProductDto,
      isActive: createProductDto.isActive === 'true' ? true : 
                createProductDto.isActive === 'false' ? false : 
                undefined,
      isFeatured: createProductDto.isFeatured === 'true' ? true : 
                  createProductDto.isFeatured === 'false' ? false : 
                  undefined,
    };

    const productData = {
      ...processedDto,
      images: imagePaths,
    };

    const product = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);
    
    // Fetch the product with relationships
    const productWithRelations = await this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['category', 'brand'],
    });
    
    return this.transformProduct(productWithRelations);
  }

  async findAll(query: QueryProductDto = {}): Promise<ProductResponseDto[]> {
    const {
      search,
      category_id,
      brand_id,
      isActive,
      isFeatured,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'ASC',
    } = query;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand');

    // Search functionality
    if (search) {
      queryBuilder.andWhere(
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Filter by category
    if (category_id) {
      queryBuilder.andWhere('product.category_id = :category_id', { category_id });
    }

    // Filter by brand
    if (brand_id) {
      queryBuilder.andWhere('product.brand_id = :brand_id', { brand_id });
    }

    // Filter by active status
    if (isActive !== undefined && typeof isActive === 'boolean') {
      queryBuilder.andWhere('product.isActive = :isActive', { isActive });
    }

    // Filter by featured status
    if (isFeatured !== undefined && typeof isFeatured === 'boolean') {
      queryBuilder.andWhere('product.isFeatured = :isFeatured', { isFeatured });
    }

    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      if (minPrice !== undefined && maxPrice !== undefined) {
        queryBuilder.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
          minPrice,
          maxPrice,
        });
      } else if (minPrice !== undefined) {
        queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
      } else if (maxPrice !== undefined) {
        queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
      }
    }

    // Sorting
    queryBuilder.orderBy(`product.${sortBy}`, sortOrder);

    const products = await queryBuilder.getMany();

    return this.transformProducts(products);
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return this.transformProduct(product);
  }

  async findFeatured(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find({
      where: { isFeatured: true, isActive: true },
      relations: ['category', 'brand'],
      order: { createdAt: 'DESC' },
      take: 10,
    });

    return this.transformProducts(products);
  }

  async update(
    id: number,
    updateProductDto: Partial<UpdateProductWithImagesDto>,
    files: Express.Multer.File[],
  ): Promise<ProductResponseDto> {
    // Get the raw product from database (without domain prefix)
    const rawProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });

    if (!rawProduct) {
      throw new NotFoundException('Product not found!');
    }

    // Get existing images without domain prefix
    const existingImages = rawProduct.images || [];
    const imagePaths: string[] = [...existingImages];
    
    if (files && files.length > 0) {
      for (const file of files) {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        const filePath = path.join('uploads/images/products', fileName);
        const fullPath = path.join(process.cwd(), filePath);
        
        // Ensure directory exists
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write file
        fs.writeFileSync(fullPath, file.buffer);
        imagePaths.push(filePath);
      }
    }

    // Convert boolean strings to actual booleans
    const processedDto = {
      ...updateProductDto,
      isActive: updateProductDto.isActive === 'true' ? true : 
                updateProductDto.isActive === 'false' ? false : 
                updateProductDto.isActive,
      isFeatured: updateProductDto.isFeatured === 'true' ? true : 
                  updateProductDto.isFeatured === 'false' ? false : 
                  updateProductDto.isFeatured,
    };

    // Update the product entity with all fields except foreign keys first
    const { category_id, brand_id, ...otherFields } = processedDto;
    Object.assign(rawProduct, otherFields);
    rawProduct.images = imagePaths;
    
    // Explicitly handle foreign key updates if provided
    if (updateProductDto.category_id !== undefined) {
      rawProduct.category_id = updateProductDto.category_id;
    }
    if (updateProductDto.brand_id !== undefined) {
      rawProduct.brand_id = updateProductDto.brand_id;
    }
    
    // Use update method to ensure foreign keys are properly saved
    const updateData: any = {
      ...processedDto,
      images: imagePaths,
    };
    
    // Explicitly include foreign keys in update data
    if (updateProductDto.category_id !== undefined) {
      updateData.category_id = updateProductDto.category_id;
    }
    if (updateProductDto.brand_id !== undefined) {
      updateData.brand_id = updateProductDto.brand_id;
    }
    
    await this.productRepository.update(id, updateData);
    
    // Fetch the product with relationships
    const productWithRelations = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });
    
    return this.transformProduct(productWithRelations);
  }

  async remove(id: number) {
    // Get the raw product from database (without domain prefix)
    const rawProduct = await this.productRepository.findOne({
      where: { id },
    });

    if (!rawProduct) {
      throw new NotFoundException('Product not found!');
    }
    
    // Delete associated images
    if (rawProduct.images && rawProduct.images.length > 0) {
      for (const imagePath of rawProduct.images) {
        const fullPath = path.join(process.cwd(), imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    }
    
    return await this.productRepository.delete(rawProduct.id);
  }

  async updateStock(id: number, quantity: number): Promise<ProductResponseDto> {
    // Get the raw product entity (without domain prefix in images)
    const rawProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });

    if (!rawProduct) {
      throw new NotFoundException('Product not found!');
    }

    rawProduct.stock = quantity;
    const savedProduct = await this.productRepository.save(rawProduct);
    
    return this.transformProduct(savedProduct);
  }

  async deleteImage(id: number, imageIndex: number): Promise<ProductResponseDto> {
    // Get the raw product from database (without domain prefix)
    const rawProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });

    if (!rawProduct) {
      throw new NotFoundException('Product not found!');
    }
    
    if (rawProduct.images && rawProduct.images[imageIndex]) {
      const imagePath = rawProduct.images[imageIndex];
      const fullPath = path.join(process.cwd(), imagePath);
      
      // Delete file from filesystem
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      
      // Remove from array
      rawProduct.images.splice(imageIndex, 1);
      const savedProduct = await this.productRepository.save(rawProduct);
      return this.transformProduct(savedProduct);
    }
    
    throw new NotFoundException('Image not found!');
  }
} 