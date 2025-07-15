import { IsNotEmpty, IsArray, IsString, ValidateNested, IsPhoneNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Date can not be empty!' })
  @IsString({ message: 'Date should be string!' })
  date: string;

  @IsNotEmpty({ message: 'Phone number can not be empty!' })
  phone: string;

  @IsNotEmpty({ message: 'Address can not be empty!' })
  @IsString({ message: 'Address should be string!' })
  address: string;

  @IsArray({ message: 'Order items should be array!' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
} 