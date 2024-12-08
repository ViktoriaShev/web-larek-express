import { Router } from "express";

import orderRouter from "./order";
import productRouter from "./product";
import NotFoundError from "../errors/not-found-error";

const combinedRouter = Router();

combinedRouter.use("/order", orderRouter);
combinedRouter.use("/product", productRouter);
combinedRouter.use((_req, _res, next) => {
  next(new NotFoundError("Route not found"));
});

export default combinedRouter;
