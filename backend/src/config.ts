import { config } from "dotenv";

config();

interface Config {
  PORT: number;
  DB_ADDRESS: string;
  UPLOAD_PATH: string;
  UPLOAD_PATH_TEMP: string;
  ORIGIN_ALLOW: string;
}

const getConfig = (): Config => ({
  PORT: parseInt(process.env.PORT || "3000", 10),
  DB_ADDRESS: process.env.DB_ADDRESS || "mongodb://127.0.0.1:27017/weblarek",
  UPLOAD_PATH: process.env.UPLOAD_PATH || "images",
  UPLOAD_PATH_TEMP: process.env.UPLOAD_PATH_TEMP || "temp",
  ORIGIN_ALLOW: process.env.ORIGIN_ALLOW || "http://localhost:5173",
});

const configData = getConfig();

export default configData;
