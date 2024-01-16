import { IOrderItem } from "./order-items";
import mongoose, { Schema } from "mongoose";
import { OrderItemSchema } from "./order-items";

export interface IOrder extends Document {
  _id: string;
  name: string;
  email: string;
  created_at: Date;
  order_items: IOrderItem[];
  total_price?: number; // Add this line to include the totalPrice property
}


const orderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  order_items: [OrderItemSchema]
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);

