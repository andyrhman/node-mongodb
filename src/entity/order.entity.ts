import { ObjectId, Entity, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";
import { OrderItem } from "./order-items.entity";

@Entity('orders')
export class Order {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: string;

    // In MongoDB, you can use an array of subdocuments directly
    // However, you'll need to adjust your logic for persisting these.
    @Column(type => OrderItem)
    order_items: OrderItem[];

    get total(): number {
        return this.order_items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    }
}
