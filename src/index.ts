import "reflect-metadata"
import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";

const app = express();
app.use(express.json());

routes(app);

mongoose.connect('mongodb://localhost/node_admin')
    .then(() => console.log('Database has been initialized!'))
    .catch((err) => console.error(err));

app.listen(3000, () => {
    console.log('Server listening on port 8000');
});
