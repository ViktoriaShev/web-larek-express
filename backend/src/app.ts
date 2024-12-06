import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import { errors } from "celebrate";

import config from "./config";
import router from "./routes";

import requestLogger from "./middlewares/request-log";
import errorLogger from "./middlewares/error-log";
import errorMiddleware from "./middlewares/error-header";

const app = express();

mongoose.connect(config.DB_ADDRESS);

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
