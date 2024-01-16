import { Request, Response } from "express";
import { Order } from "../models/order";
import paginateOrders from "../utility/order-pagination.utility";
import { paginate } from "../utility/pagination.utility";
import sanitizeHtml from "sanitize-html";
import { Parser } from "@json2csv/plainjs";

export const Orders = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    let search = req.query.search;

    try {
        const result = await paginate(Order, page, limit);

        if (typeof search === 'string') {
            search = sanitizeHtml(search);
            if (search) {
                const searchOrder = search.toString().toLowerCase();

                result.data = result.data.filter((order: { order_items: any[]; name: string; email: string; }) => {
                    const orderMatches = order.order_items.some((orderItem: { product_title: string; }) => {
                        return orderItem.product_title.toLowerCase().includes(searchOrder);
                    });
                    return (
                        order.name.toLowerCase().includes(searchOrder) ||
                        order.email.toLowerCase().includes(searchOrder) ||
                        orderMatches
                    );
                });

                // Check if the resulting filtered data array is empty
                if (result.data.length === 0) {
                    // Respond with a 404 status code and a message
                    return res.status(404).json({ message: `No ${search} matching your search criteria.` });
                }
            }
        }


        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const Export = async (req: Request, res: Response) => {
    const parser = new Parser({
        fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
    });

    const orders = await Order.find({});

    const json: any[] = []; // Consider defining a more specific type for your JSON objects

    // Use the IOrder and IOrderItem interfaces for type annotations
    orders.forEach((o) => {
        o.order_items.forEach((i) => { // Note the change from order_item to order_items
            json.push({
                ID: o.id,
                Name: o.name,
                Email: o.email,
                'Product Title': i.product_title,
                Price: i.price,
                Quantity: i.quantity
            });
        });
    });

    const csv = parser.parse(json);

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    res.send(csv);
};
/*
export const CreateOrder = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const order = await Order.create({
            name: body.name,
            email: body.email
        });

        res.status(201).send(order)
    } catch (error) {
        return res.status(400).send({ messsage: "Error trying to save the data" })
    }
}
*/

// ? Alternative
/* ? https://www.phind.com/search?cache=adk89zkq2ifb4tjbv3ma76x8
*    export const CreateOrder = async (req: Request, res: Response) => {
*        try {
*            const body = req.body;
*            const order = new Order({
*                name: body.name,
*                email: body.email
*            });
*            await order.save();
*        
*            res.status(201).send(order);
*        } catch (error) {
*            return res.status(400).send({messsage: "Error trying to save the data"})
*        }
*    }
*/
