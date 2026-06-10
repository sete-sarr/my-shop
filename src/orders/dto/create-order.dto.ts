import {

IsPositive,
IsString,
IsUUID,
IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString({
  message: 'customerId must be a string'
  })
  // @IsUUID('all', { message: 'customerId must be a
  // valid UUID' })
  customerId!: string;
  @IsString({ message: 'productId must be a string' })
  @IsUUID(
  'all',
  { message: 'productId must be a valid UUID' }
  )
  productId!: string;

  @IsPositive({
  message: 'quantity must be a positive number'
  })
  quantity!: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, {
    message: 'totalPrice must be a decimal number'
  })
  totalPrice!: number;
}