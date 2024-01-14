import { myDataSource } from "../config/db.config";
import { Request, Response } from "express"
import { Order } from '../entity/order.entity';

export const Orders = async (req: Request, res: Response) => {
    const repository = myDataSource.getMongoRepository(Order);

    const orders = await repository.aggregate([
        {
            $lookup: {
                from: "order_items", // Ensure this is the correct collection name
                localField: "_id",   // This is the field from the orders collection
                foreignField: "order_items", // This is the field from the order_items collection
                as: "order_items" // The field where the data will be populated
            }
        }
    ]).toArray();

    res.send(orders);
};

export const CreateOrder = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = myDataSource.getMongoRepository(Order);

    const order = await repository.save({
        name: body.name,
        email: body.email
    });

    res.status(201).send(order)
}