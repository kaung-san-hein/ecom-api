import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['orderItems'] as const)
) {
  @IsOptional()
  @IsString({ message: 'Payment image should be string!' })
  payment_image?: string;
} 