import { Request, Response, NextFunction } from "express";
import AppError from "../errors/app-error";

const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send({
    status: "error",
    statusCode,
    message,
  });
};

export default errorMiddleware;
