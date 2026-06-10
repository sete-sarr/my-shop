import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaginationService } from '../common/pagination/pagination.service';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import{PaginationService
} from '../common/pagination/pagination.service';



describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        PaginationService,
        {
          provide: getRepositoryToken(Order),
          useValue: {},
        }
        ,
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        }
      ],  
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
