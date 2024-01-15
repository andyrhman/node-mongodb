// order-pagination.js
import { IOrder } from "../interface/order.interface";
import { Order } from "../models/order";

const paginateOrders = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const countPromise = Order.countDocuments().exec();

    const docsPromise = Order.find()
        .skip(skip)
        .limit(limit)
        .lean() // Lean for performance, as we'll add a virtual field.
        .exec();

    const [total, data] = await Promise.all([countPromise, docsPromise]);

    // Calculate total price for each order's items
    for (let order of data as IOrder[]) { // Cast data to the IOrder interface
        order.total_price = order.order_items.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
    }

    return {
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total / limit),
        }
    };
};

export default paginateOrders;
