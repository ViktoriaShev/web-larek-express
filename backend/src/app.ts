import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import { errors } from "celebrate";
import { rateLimit } from "express-rate-limit";

import config from "./config";
import router from "./routes";

import requestLogger from "./middlewares/request-log";
import errorLogger from "./middlewares/error-log";
import errorMiddleware from "./middlewares/error-header";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 4500000, // Limit each IP to 100 requests per `window`. In 1 sec have 5 req.
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  statusCode: 429,
  message: "The request limit is reached.",
});

const app = express();

mongoose.connect(config.DB_ADDRESS);

app.use(limiter);

app.disable("x-powered-by");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger);
app.use("/", router);
app.use(errors());
app.use(errorLogger);
app.use(errorMiddleware);

app.listen(config.PORT, () => {
  console.log(`listening port: ${config.PORT}`);
});
