import { IOrder } from './../interface/order.interface';
import mongoose, { Schema } from "mongoose";
import { OrderItemSchema } from "./order-items";

const orderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  order_items: [OrderItemSchema]
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);

