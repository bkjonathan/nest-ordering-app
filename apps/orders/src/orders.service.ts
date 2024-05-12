import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  createOrder(payload: CreateOrderDto) {
    return this.ordersRepository.create(payload);
  }
  async getOrders() {
    return this.ordersRepository.find({});
  }
}
