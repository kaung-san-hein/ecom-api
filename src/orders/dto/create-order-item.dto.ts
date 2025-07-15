import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsNotEmpty({ message: 'Product ID can not be empty!' })
  @IsNumber({}, { message: 'Product ID should be number!' })
  @Type(() => Number)
  product_id: number;

  @IsNotEmpty({ message: 'Quantity can not be empty!' })
  @IsNumber({}, { message: 'Quantity should be number!' })
  @Min(1, { message: 'Quantity should be at least 1!' })
  @Type(() => Number)
  quantity: number;
} 