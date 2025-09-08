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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderReportDto } from './dto/report.dto';
import { AuthenticationGuard } from 'src/users/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/users/utility/guards/authorization.guard';
import { Roles } from 'src/users/utility/common/user-roles.enum';
import { CurrentUser } from 'src/users/utility/decorators/current-user.decorator';
import { OrderEntity } from './entities/order.entity';
import * as path from 'path';
import * as fs from 'fs';

@Controller('orders')
@UseGuards(AuthenticationGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('payment_image'))
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ): Promise<OrderEntity> {
    let paymentImagePath: string | null = null;

    if (file) {
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      const filePath = path.join('uploads/payments', fileName);
      const fullPath = path.join(process.cwd(), filePath);
      
      // Ensure directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write file
      fs.writeFileSync(fullPath, file.buffer);
      paymentImagePath = filePath;
    }

    const orderData = {
      ...createOrderDto,
      payment_image: paymentImagePath,
    };

    return await this.ordersService.create(orderData, user.id);
  }

  @Get()
  async findAll(@CurrentUser() user: any): Promise<OrderEntity[]> {
    // Regular users can only see their own orders
    // Admins can see all orders
    const userId = user.roles[0] === Roles.ADMIN ? undefined : user.id;
    return await this.ordersService.findAll(userId);
  }

  @Get('report')
  @UseGuards(AuthorizeGuard([Roles.ADMIN]))
  async getReport(): Promise<OrderReportDto> {
    return await this.ordersService.getReport();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<OrderEntity> {
    const userId = user.role === Roles.ADMIN ? undefined : user.id;
    return await this.ordersService.findOne(+id, userId);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('payment_image'))
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<UpdateOrderDto>,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif|webp)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ): Promise<OrderEntity> {
    let paymentImagePath: string | undefined = undefined;

    if (file) {
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      const filePath = path.join('uploads/payments', fileName);
      const fullPath = path.join(process.cwd(), filePath);
      
      // Ensure directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write file
      fs.writeFileSync(fullPath, file.buffer);
      paymentImagePath = filePath;
    }

    const orderData = {
      ...updateOrderDto,
      payment_image: paymentImagePath,
    };

    return await this.ordersService.update(+id, orderData);
  }

  // @UseGuards(AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ): Promise<OrderEntity> {
    return await this.ordersService.updateStatus(+id, body.status);
  }

  @UseGuards(AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
} 