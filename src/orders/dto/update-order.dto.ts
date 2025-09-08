import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString({ message: 'Phone should be string!' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Address should be string!' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Payment image should be string!' })
  payment_image?: string;
} 