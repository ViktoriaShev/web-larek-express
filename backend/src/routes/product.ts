import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { getProducts, createProduct } from "../controllers/products";
import { productSchema } from "../middlewares/validators";

const router = Router();

const productValidator = celebrate({ [Segments.BODY]: productSchema });

router.get("/", getProducts);
router.post("/", productValidator, createProduct);

export default router;
