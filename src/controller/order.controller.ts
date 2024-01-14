import { Request, Response } from "express"
import { Order } from "../models/order";

export const Orders = async (req: Request, res: Response) => {
    const orders = await Order.find().populate('order_items');

    res.send(orders);
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
