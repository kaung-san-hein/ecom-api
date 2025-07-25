import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name can not be empty!' })
  @IsString({ message: 'Name should be string!' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Image should be string!' })
  image?: string;
}
