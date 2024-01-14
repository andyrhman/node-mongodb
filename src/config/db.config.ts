import { DataSource } from "typeorm"​

export const myDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "node_admin",
    logging: false,
    synchronize: true,
    entities: [
        "src/entity/*.ts"
    ],
});
