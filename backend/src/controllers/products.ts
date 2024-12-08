import { Request, Response, NextFunction } from "express";

import { IProduct } from "../types";
import Product from "../models/product";
import BadRequestError from "../errors/bad-request-error";
import NotFoundError from "../errors/not-found-error";
import ConflictError from "../errors/conflict-error";

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  // eslint-disable-next-line consistent-return
  .then((products) => {
    if (!products.length) {
      return next(new NotFoundError("No products found."));
    }
    res.status(200).send({ items: products, total: products.length });
  })
  .catch((error) => next(error));

export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    price, image, description, title, category,
  }: IProduct = req.body;
  const finalPrice = price !== undefined ? price : null;

  if (!title || !category || !image) {
    return next(
      new BadRequestError("Image, title, and category are required."),
    );
  }

  return Product.create({
    price: finalPrice,
    image,
    description,
    title,
    category,
  })
    .then((product) => res.send(product))
    .catch((error) => {
      if (error instanceof Error && error.message.includes("E11000")) {
        return next(
          new ConflictError(
            "Product title must be unique. A product with this title already exists.",
          ),
        );
      }
      return next(error);
    });
};
