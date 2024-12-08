import Joi from "joi";
import { PaymentMethod } from "../types";

export const orderSchema = Joi.object({
  payment: Joi.string()
    .valid(PaymentMethod.Card, PaymentMethod.Online)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+0-9\s()-]+$/)
    .required(),
  address: Joi.string().min(5).required(),
  total: Joi.number().greater(0).required(),
  items: Joi.array().items(Joi.string().min(1)).required(),
});

export const productSchema = Joi.object({
  title: Joi.string().required().min(2),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().optional(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().allow(null).optional(),
});
