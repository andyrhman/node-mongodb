import mongoose from "mongoose";
import { OrderItemSchema } from "./order-items";

const orderSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    // Embedding order items as subdocuments
    order_items: [OrderItemSchema]
});

// Virtual for total calculation
orderSchema.virtual('total').get(function () {
    return this.order_items.reduce((sum, item) => sum + item.quantity * item.price, 0);
});

export const Order = mongoose.model('Order', orderSchema);;
