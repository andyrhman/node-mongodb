import { ObjectId, Entity, ObjectIdColumn, Column } from "typeorm";

@Entity('order_items')
export class OrderItem {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    product_title: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    // In MongoDB, you typically reference other documents by their ID
    // This will just store the reference ID, not a full join
    @Column()
    order_id: string;
}
