import { Request, Response } from "express";
import { Order } from "../models/order"; // Import the model
import { paginate } from "../utility/pagination.utility";

export const Orders = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const result = await paginate(Order, page, limit);
        res.send(result);
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
