import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateProductWithImagesDto {
  @IsNotEmpty({ message: 'Name can not be empty!' })
  @IsString({ message: 'Name should be string!' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description should be string!' })
  description?: string;

  @IsNotEmpty({ message: 'Price can not be empty!' })
  @IsNumber({}, { message: 'Price should be number!' })
  @Min(0, { message: 'Price should be greater than or equal to 0!' })
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'Discount percentage should be number!' })
  @Min(0, { message: 'Discount percentage should be greater than or equal to 0!' })
  @Type(() => Number)
  discountPercentage?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Stock should be number!' })
  @Min(0, { message: 'Stock should be greater than or equal to 0!' })
  @Type(() => Number)
  stock?: number;

  @IsOptional()
  @IsString({ message: 'Is active should be a string value (true or false)' })
  isActive?: string;

  @IsOptional()
  @IsString({ message: 'Is featured should be a string value (true or false)' })
  isFeatured?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Category ID should be number!' })
  @Type(() => Number)
  category_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Brand ID should be number!' })
  @Type(() => Number)
  brand_id?: number;
} 