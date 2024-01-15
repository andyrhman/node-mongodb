import { Request, Response } from "express";
import { Order } from "../models/order"; // Import the model

export const Orders = async (req: Request, res: Response) => {
    // Default values for pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    try {
        // Get the total count of orders for pagination metadata
        const total = await Order.countDocuments({});

        // Find the orders with pagination applied
        const orders = await Order.find({})
            .sort({ created_at: -1 }) // Sorting by creation date, newest first
            .skip(skip)
            .limit(limit);

        // Send paginated response
        res.send({
            orders,
            meta: {
                page,
                total: Math.ceil(total / limit),
                last_page: total
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



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
