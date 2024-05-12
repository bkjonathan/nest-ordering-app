import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() payload: CreateOrderDto) {
    return this.ordersService.createOrder(payload);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
