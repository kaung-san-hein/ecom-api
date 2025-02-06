import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRespository: Repository<CategoryEntity>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    currentUser: UserEntity,
  ): Promise<CategoryEntity> {
    const category = this.categoryRespository.create(createCategoryDto);
    category.addedBy = currentUser;
    return await this.categoryRespository.save(category);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRespository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return await this.categoryRespository.findOne({
      where: { id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  async update(
    id: number,
    updateCategoryDto: Partial<UpdateCategoryDto>,
  ): Promise<CategoryEntity> {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Category not found!');

    Object.assign(category, updateCategoryDto);

    return await this.categoryRespository.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
