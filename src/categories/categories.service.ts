import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CategoriesService {
  private readonly domainPrefix =
    process.env.DOMAIN_URL || 'http://localhost:3000';

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRespository: Repository<CategoryEntity>,
  ) {}

  private transformImage(image: string): string {
    if (!image) return null;
    return `${this.domainPrefix}/${image}`;
  }

  private transformCategory(category: CategoryEntity): CategoryEntity {
    if (category.image) {
      category.image = this.transformImage(category.image);
    }
    return category;
  }

  private transformCategories(categories: CategoryEntity[]): CategoryEntity[] {
    return categories.map((category) => this.transformCategory(category));
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    file?: Express.Multer.File,
  ): Promise<CategoryEntity> {
    let imagePath: string = null;

    if (file) {
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      const filePath = path.join('uploads/images/categories', fileName);
      const fullPath = path.join(process.cwd(), filePath);

      // Ensure directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write file
      fs.writeFileSync(fullPath, file.buffer);
      imagePath = filePath;
    }

    const categoryData = {
      ...createCategoryDto,
      image: imagePath,
    };

    const category = this.categoryRespository.create(categoryData);
    const savedCategory = await this.categoryRespository.save(category);

    return this.transformCategory(savedCategory);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRespository.find({
      order: { id: 'ASC' },
    });
    return this.transformCategories(categories);
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRespository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found!');
    }

    return this.transformCategory(category);
  }

  async update(
    id: number,
    updateCategoryDto: Partial<UpdateCategoryDto>,
    file?: Express.Multer.File,
  ): Promise<CategoryEntity> {
    // Get the raw category from database (without domain prefix)
    const rawCategory = await this.categoryRespository.findOne({
      where: { id },
    });

    if (!rawCategory) {
      throw new NotFoundException('Category not found!');
    }

    let imagePath: string = rawCategory.image;

    if (file) {
      // Delete old image if exists
      if (rawCategory.image) {
        const oldImagePath = path.join(process.cwd(), rawCategory.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      const filePath = path.join('uploads/images/categories', fileName);
      const fullPath = path.join(process.cwd(), filePath);

      // Ensure directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write file
      fs.writeFileSync(fullPath, file.buffer);
      imagePath = filePath;
    }

    const categoryData = {
      ...updateCategoryDto,
      image: imagePath,
    };

    Object.assign(rawCategory, categoryData);
    const savedCategory = await this.categoryRespository.save(rawCategory);

    return this.transformCategory(savedCategory);
  }

  async remove(id: number) {
    const category = await this.categoryRespository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found!');
    }

    // Delete associated image
    if (category.image) {
      const fullPath = path.join(process.cwd(), category.image);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    return await this.categoryRespository.delete(category.id);
  }
}
