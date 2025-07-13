// update-stock.dto.ts
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateStockDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;
}
