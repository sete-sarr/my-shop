import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';
import {ApiProperty} from '@nestjs/swagger'

// =========================
// ENUMS
// =========================
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MERCHANT = 'merchant',
}

// =========================
// ENTITY
// =========================
@Entity()
export class User {
  
  // =========================
  // PRIMARY KEY
  // =========================
  @ApiProperty({ description: 'User ID' })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // =========================
  // BASIC FIELDS
  // =========================
  @ApiProperty({ description: 'User Email' })
  @Column({ unique: true })
  email?: string;

  @ApiProperty({ description: 'User Username' })
  @Column({ unique: true })
  username!: string;

  @ApiProperty({ description: 'User Password' })
  @Column()
  password!: string;

  // =========================
  // RELATIONS
  // =========================
//   @OneToMany(() => Order, (order) => order.customer)
//   orders: Order[];

  @ApiProperty({ description: 'User Orders' })
  @OneToMany(()=>Order, (order)=>order.customer)
  orders?:Order[];

  /*
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
  */

  @ApiProperty({ description: 'User Role' })
  // =========================
  // ROLE
  // =========================
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
   })
   role!: UserRole;

  @ApiProperty({ description: 'User Creation Date' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
   createdAt?: Date;
}
