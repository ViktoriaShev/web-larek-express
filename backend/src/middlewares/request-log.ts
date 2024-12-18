const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

export default requestLogger;
