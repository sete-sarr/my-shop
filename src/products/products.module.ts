import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import{PaginationService
} from '../common/pagination/pagination.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // ⭐ TRÈS IMPORTANT
  ],
  controllers: [ProductsController],
  providers: [ProductsService, PaginationService],
})
export class ProductsModule {}
