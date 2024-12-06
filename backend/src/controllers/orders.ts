import { Request, Response, NextFunction } from "express";
import { faker } from "@faker-js/faker";

import { IOrder, PaymentMethod } from "../types";
import Product from "../models/product";
import BadRequestError from "../errors/bad-request-error";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { payment, phone, total, items }: IOrder = req.body;
  // Проверка на наличие товаров в базе данных
  if (!Array.isArray(items) || items.length === 0) {
    return next(new BadRequestError("Items must be a non-empty array."));
  }

  // Проверка на валидность payment
  if (!Object.values(PaymentMethod).includes(payment)) {
    return next(
      new BadRequestError("Payment method must be either 'card' or 'online'."),
    );
  }

  // Проверка на обязательные поля
  if (!phone) {
    return next(new BadRequestError("Phone are required."));
  }

  try {
    const products = await Product.find({ _id: { $in: items } });
    let summ = 0;

    const invalidProducts = products.filter((product) => {
      if (!product.price) {
        return true;
      }
      summ += product.price || 0;
      return false;
    });

    // Проверка на соответствие общей суммы
    if (summ !== total) {
      return next(
        new BadRequestError(
          `Total price mismatch: expected ${total}, got ${summ}.`,
        ),
      );
    }

    if (invalidProducts.length > 0) {
      return next(
        new BadRequestError("Some products are not available for sale."),
      );
    }

    return res.status(200).send({ id: faker.string.uuid(), total: summ });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
