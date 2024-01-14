import mongoose from "mongoose";

export const OrderItemSchema = new mongoose.Schema({
    product_title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    // Assuming you want to keep a reference to the related order
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
});

export const OrderItem = mongoose.model('OrderItem', OrderItemSchema);