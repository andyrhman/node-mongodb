import { Request, Response } from "express";
import { Order } from "../models/order"; // Import the model

export const Orders = async (req: Request, res: Response) => {
    try {
        const orders = Order.find({});

        res.send(orders)
    } catch (error) {
        res.status(500).json({ message: error.message });
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
