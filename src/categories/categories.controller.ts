import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthenticationGuard } from 'src/users/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/users/utility/guards/authorization.guard';
import { Roles } from 'src/users/utility/common/user-roles.enum';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.create(createCategoryDto, file);
  }

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryEntity> {
    return await this.categoriesService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<UpdateCategoryDto>,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.update(+id, updateCategoryDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
