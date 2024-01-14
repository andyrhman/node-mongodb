import "reflect-metadata"
import express from "express";
import { myDataSource } from "./config/db.config";
import { routes } from "./routes";

const app = express();
app.use(express.json());

// Initialize TypeORM connection and start the Express server
myDataSource.initialize().then(() => {
    routes(app);

    console.log("Database has been initialized!");
    app.listen(8000, () => {
        console.log('Server listening on port 8000');
    });
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});