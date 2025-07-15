import { PartialType } from '@nestjs/mapped-types';
import { CreateProductWithImagesDto } from './create-product-with-images.dto';

export class UpdateProductWithImagesDto extends PartialType(CreateProductWithImagesDto) {} 