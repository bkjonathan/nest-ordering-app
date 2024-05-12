import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
