import { randomInt } from 'crypto';
import { OrderItem } from '../entity/order-items.entity';
import { Order } from '../entity/order.entity';
import { myDataSource } from '../config/db.config';
import { fakerID_ID as faker } from "@faker-js/faker";

myDataSource.initialize().then(async () => {
    const orderRepository = myDataSource.getMongoRepository(Order);
    const orderItemRepository = myDataSource.getMongoRepository(OrderItem);

    for (let i = 0; i < 30; i++) {
        const order = await orderRepository.save({
            name: faker.person.fullName(),
            email: faker.internet.email(),
        });
        for (let j = 0; j < randomInt(1, 5); j++) {
            await orderItemRepository.save({
                // Remove the order: order line, it's not necessary for the seeding process
                order_id: order.id.toString(), // Convert ObjectId to string
                product_title: faker.commerce.productName(),
                price: parseInt(faker.commerce.price({ min: 100, max: 1000, dec: 0 }), 10),
                quantity: randomInt(1, 5),
            });
        }
    }

    console.log('Seeding complete!');
    process.exit(0);
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
