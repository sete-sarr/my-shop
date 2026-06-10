import {
Product
} from '../../products/entities/product.entity';
import {
Column,
Entity,
ManyToOne,
PrimaryGeneratedColumn
} from 'typeorm';
import {
User
} from '../../users/entities/user.entity';

export enum StatusOrder{
    PENDING='PENDING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    CANCELLED='CANCELLED'

}
@Entity('commande')
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id?:string
    @Column()
    quantity!:number

      
    @ManyToOne(()=>User, (user)=>user.orders)
    customer!:User

    @Column({ type: 'enum',
    enum: StatusOrder,
    default: StatusOrder.PENDING})
    status?:StatusOrder

    @Column(
     'decimal', { precision: 5, scale: 2, default: 0 }
     )
    totalPrice?: number;
    @ManyToOne(() =>Product, (product) =>product.orders)
    product!:Product

    @Column(
    { type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP' }
    )
    createdAt?: Date;
}
