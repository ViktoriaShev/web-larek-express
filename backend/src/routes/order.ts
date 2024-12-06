import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import createOrder from "../controllers/orders";

import { orderSchema } from "../middlewares/validators";

const router = Router();

const orderValidator = celebrate({ [Segments.BODY]: orderSchema });

router.post("/", orderValidator, createOrder);

export default router;
