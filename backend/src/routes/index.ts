import { Router } from "express";

import orderRouter from "./order";
import productRouter from "./product";

const combinedRouter = Router();

combinedRouter.use("/order", orderRouter);
combinedRouter.use("/product", productRouter);
combinedRouter.use((_req, res) => {
  res.status(404).send({ message: "Route not found" });
});

export default combinedRouter;
