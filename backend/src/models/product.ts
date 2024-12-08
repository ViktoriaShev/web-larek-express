import mongoose from "mongoose";

import { IImage, IProduct } from "../types";

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, "Минимальная длина поля 'title' - 2"],
    maxlength: [30, "Максимальная длина поля 'title' - 30"],
    required: true,
    unique: true,
  },
  image: imageSchema,
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>("product", productSchema);
