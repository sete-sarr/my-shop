import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from './entities/order.entity';
import{PaginationService
} from '../common/pagination/pagination.service';


@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly paginationService:
    PaginationService,  
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { productId, quantity, totalPrice } = createOrderDto;

      const product = await this.productRepository.findOne({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException('Produit introuvable');
      }

      const order = this.orderRepository.create({
        product,
        quantity,
        totalPrice,
      });

      await this.orderRepository.save(order);

      return {
        message: 'Order created successfully',
        order,
      };
    } catch (error) {
      return {
        message: 'An error occurred!',
        error,
      };
    }
  }

  async findAll({ page = 1, limit = 10 }) {
    const totalItem =await this.orderRepository.count()
    const meta =await this.paginationService.getPaginationMeta(totalItem, page, limit)
    const orders = await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['product'],
    });

    return {
      message: 'Orders retrieved successfully',
      orders,
      meta
    };
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      message: 'Order retrieved successfully',
      order,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (updateOrderDto.productId) {
      const product = await this.productRepository.findOne({
        where: { id: updateOrderDto.productId },
      });

      if (!product) {
        throw new NotFoundException('Produit introuvable');
      }

      order.product = product;
    }

    if (updateOrderDto.quantity !== undefined) {
      order.quantity = updateOrderDto.quantity;
    }

    if (updateOrderDto.totalPrice !== undefined) {
      order.totalPrice = updateOrderDto.totalPrice;
    }

    await this.orderRepository.save(order);

    return {
      message: 'Order updated successfully',
      order,
    };
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderRepository.remove(order);

    return {
      message: 'Order deleted successfully',
    };
  }
}