import{Column, PrimaryGeneratedColumn, Entity,OneToMany}from 'typeorm'
import { Order } from '../../orders/entities/order.entity';
@Entity('Products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id?:string

    @Column('text')
    name!:string

    @OneToMany(() => Order, (order) => order.product)
    orders?: Order[];

    @Column('text')
    description?:string

    @Column('decimal', {default:0.0})
    price!:number

    @Column('text', {default:'non image'})
    image?:string

    @Column('simple-json',{default:{},
    comment: "a key-value pair that represents theproduct's specs",})
    specs?: Record<string, string>;
    
    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at?:Date

}
