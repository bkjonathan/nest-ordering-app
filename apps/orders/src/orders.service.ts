import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { BILLING_SERVICE } from './constats/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  async createOrder(payload: CreateOrderDto) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(payload, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          payload: order,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
  async getOrders() {
    return this.ordersRepository.find({});
  }
}
