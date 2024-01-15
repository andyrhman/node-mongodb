import { Router } from "express";
import { Export, Orders } from "./controller/order.controller";

export const routes = (router: Router) => {
    router.get('/api/orders', Orders);
    router.post('/api/export', Export);


    // router.post('/api/orders', CreateOrder);
    router.get('/api/orders/:id');
    router.put('/api/orders/:id');
    router.delete('/api/orders/:id');
}