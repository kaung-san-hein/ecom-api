import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { QueryProductDto } from './dto/query-product.dto';
import { CreateProductWithImagesDto } from './dto/create-product-with-images.dto';
import { UpdateProductWithImagesDto } from './dto/update-product-with-images.dto';
import { AuthenticationGuard } from 'src/users/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/users/utility/guards/authorization.guard';
import { Roles } from 'src/users/utility/common/user-roles.enum';
import { ProductResponseDto } from './dto/product-response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @Body() createProductDto: CreateProductWithImagesDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
  ): Promise<ProductResponseDto> {
    return await this.productsService.create(createProductDto, files);
  }

  @Get()
  async findAll(@Query() query: QueryProductDto): Promise<ProductResponseDto[]> {
    return await this.productsService.findAll(query);
  }

  @Get('featured')
  async findFeatured(): Promise<ProductResponseDto[]> {
    return await this.productsService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return await this.productsService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: Partial<UpdateProductWithImagesDto>,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
  ): Promise<ProductResponseDto> {
    return await this.productsService.update(+id, updateProductDto, files);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id/stock')
  async updateStock(
    @Param('id') id: string,
    @Body() body: { quantity: number },
  ): Promise<ProductResponseDto> {
    return await this.productsService.updateStock(+id, body.quantity);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id/image/:imageIndex')
  async deleteImage(
    @Param('id') id: string,
    @Param('imageIndex') imageIndex: string,
  ): Promise<ProductResponseDto> {
    return await this.productsService.deleteImage(+id, +imageIndex);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
} 