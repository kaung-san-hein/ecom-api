import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    const brand = this.brandRepository.create(createBrandDto);
    return await this.brandRepository.save(brand);
  }

  async findAll(): Promise<BrandEntity[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: number): Promise<BrandEntity> {
    return await this.brandRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateBrandDto: Partial<UpdateBrandDto>,
  ): Promise<BrandEntity> {
    const brand = await this.findOne(id);
    if (!brand) throw new NotFoundException('Brand not found!');

    Object.assign(brand, updateBrandDto);

    return await this.brandRepository.save(brand);
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    if (!brand) throw new NotFoundException('Brand not found!');

    return await this.brandRepository.delete(brand.id);
  }
} 