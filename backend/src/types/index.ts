export interface IImage {
  fileName: string;
  originalName?: string;
}

export interface IProduct {
  title: string; // Название товара
  image: IImage; // Путь до файла и метаинформация об изображении
  category: string; // Категория товара
  description?: string; // Описание товара (необязательное поле)
  price?: number | null; // Цена товара (необязательное поле, по умолчанию null)
}

export enum PaymentMethod {
  Card = "card",
  Online = "online",
}
export interface IOrder {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: Array<string>;
}
