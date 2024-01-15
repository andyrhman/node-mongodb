import { Document } from 'mongoose';

export interface IOrder extends Document {
    name: string;
    email: string;
    created_at: Date;
    order_items: {
        product_title: string;
        price: number;
        quantity: number;
        order?: string;
    }[];
    total_price?: number; // Add this line to include the totalPrice property
}

/*
export interface IOrderItem {
    product_title: string;
    price: number;
    quantity: number;
    // Include other properties that are part of your OrderItem model
}
// Define interfaces that correspond to the models
export interface IOrder {
    id: string;
    name: string;
    email: string;
    order_item: IOrderItem[];
    // Include other properties that are part of your Order model
}
*/


