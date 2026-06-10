import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';

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
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // =========================
  // BASIC FIELDS
  // =========================
  @Column({ unique: true })
  email?: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  // =========================
  // RELATIONS
  // =========================
//   @OneToMany(() => Order, (order) => order.customer)
//   orders: Order[];
  @OneToMany(()=>Order, (order)=>order.customer)
  orders?:Order[];

  /*
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
  */

  // =========================
  // ROLE
  // =========================
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
   })
   role!: UserRole;

  
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
   createdAt?: Date;
}
